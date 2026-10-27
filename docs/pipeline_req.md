# SatuSurvey Pipeline Requirements

**Status:** Draft untuk demo MVP\
**Scope:** Analisis laporan survei berbentuk PDF yang memiliki teks
digital\
**Arsitektur:** Django modular monolith, pipeline sinkron

------------------------------------------------------------------------

## 1. Tujuan

Dokumen ini mendefinisikan tahapan pipeline SatuSurvey pada demo saat
ini, kontrak input/output setiap tahap, pemeriksaan kualitas, penanganan
kegagalan, dan contoh payload antar-tahap.

Pipeline demo menerima laporan survei PDF, mengekstrak informasi yang
dinyatakan dalam dokumen, memeriksa keterlacakan informasi ke sumber,
menjalankan aturan deterministik yang tersedia, lalu menyusun hasil yang
dapat ditampilkan sebagai **Kartu Survei** dan disediakan melalui API.

> **Batas interpretasi:** `COMPLETED` berarti pemrosesan berhasil
> diselesaikan. Status itu tidak berarti survei terbukti valid,
> representatif, bebas bias, atau bahwa semua klaim dalam laporan benar.

## 2. Cakupan dan batasan demo

### Termasuk

-   Upload PDF laporan survei dan metadata input yang didukung.
-   Validasi file dan metadata.
-   Ekstraksi teks PDF per halaman menggunakan PyMuPDF.
-   Normalisasi informasi survei oleh Normalization Agent menjadi schema
    terstruktur.
-   Penyimpanan kutipan/teks sumber dan nomor halaman sebagai
    provenance.
-   QC schema dan pemeriksaan grounding terhadap teks PDF.
-   Rule Engine deterministik untuk:
    -   perhitungan ulang margin of error (MoE) pada kondisi yang
        didukung implementasi;
    -   kelengkapan disclosure/metodologi berdasarkan field yang
        diperiksa.
-   Analysis Agent untuk menghasilkan ringkasan, temuan, caveat, dan
    spesifikasi visualisasi.
-   QC terhadap struktur hasil analisis dan referensi yang digunakan.
-   Penyimpanan hasil, status proses, dan informasi percobaan pipeline.
-   Tampilan Kartu Survei dan endpoint JSON publik sesuai implementasi
    demo.
-   Cache/idempotensi berbasis hash file untuk menghindari pemrosesan
    duplikat yang tidak perlu.

### Belum termasuk

-   OCR untuk PDF hasil scan; PDF tanpa teks yang dapat diekstrak dapat
    ditolak.
-   Verifikasi otomatis atas reputasi penerbit/sumber eksternal.
-   Pencarian sumber dari web atau resolusi sumber secara otomatis.
-   Perbandingan komposisi sampel dengan BPS sebagai pemeriksaan wajib.
-   Deteksi konflik lintas laporan.
-   Evaluasi klaim umum yang tidak berbentuk laporan survei.
-   Penetapan kebenaran final suatu klaim, audit kausalitas, atau
    pembuktian bebas bias.
-   Human-review queue dan pipeline asinkron berbasis worker/queue.

Fitur di bagian "Belum termasuk" tidak boleh disajikan pada UI/API
seolah sudah dilakukan.

## 3. Prinsip desain

1.  **Evidence-first.** Setiap field hasil ekstraksi harus memiliki
    sumber yang dapat dilacak jika field tersebut dinyatakan ada di
    dokumen.
2.  **Unknown is not false.** Informasi yang tidak ditemukan disimpan
    sebagai `null`, `unknown`, atau representasi setara yang sesuai
    schema, bukan diisi berdasarkan tebakan.
3.  **AI mengekstrak dan menyintesis; kode deterministik memeriksa hal
    yang dapat dihitung.** Agent tidak menjadi sumber kebenaran tunggal
    untuk hasil hitung statistik.
4.  **Jangan mengubah ketidaklengkapan disclosure menjadi bukti bahwa
    survei buruk.** "Tidak dilaporkan" berbeda dari "dilakukan dengan
    buruk".
5.  **Hasil harus dapat diaudit.** Simpan sumber, halaman, excerpt,
    hasil rule, versi prompt/model jika tersedia, dan riwayat percobaan.
6.  **Proses selesai bukan berarti survei lolos.** Status pipeline dan
    interpretasi substantif hasil harus dipisahkan.
7.  **MVP tetap modular.** Orchestrator mengatur urutan tahap; modul
    agents menangani tugas LLM; rules menangani pemeriksaan
    deterministik; pipeline menangani ekstraksi/QC; surveys menangani
    persistensi domain saat ini.

## 4. Gambaran alur

``` text
PDF + input metadata
        |
        v
[1] Validate input
        |
        v
[2] Extract PDF text per page
        |
        v
[3] Normalization Agent
        |
        v
[4] Schema QC + grounding
        |
        v
[5] Deterministic Rule Engine
    - MoE check
    - disclosure check
        |
        v
[6] Analysis Agent
        |
        v
[7] Analysis QC
        |
        v
[8] Persist result + pipeline status
        |
        v
[9] Survey Card + public JSON API
```

Cache/idempotency dapat menghentikan pemrosesan ulang setelah input
divalidasi dan fingerprint/hash cocok dengan hasil yang tersedia, sesuai
perilaku implementasi.

## 5. Kontrak umum antar-tahap

Setiap tahap sebaiknya menerima konteks pipeline dan menghasilkan output
yang eksplisit. Nama field berikut adalah kontrak konseptual; nama
persisnya harus mengikuti schema dan model aktual di repository.

Contoh envelope internal:

``` json
{
  "survey_id": "surv_demo_001",
  "pipeline_run_id": "run_demo_001",
  "stage": "normalization",
  "status": "SUCCEEDED",
  "input_ref": "page_text_bundle",
  "output_ref": "survey_profile_bundle",
  "errors": [],
  "warnings": []
}
```

Aturan status yang disarankan:

-   `PENDING`: belum dimulai.
-   `RUNNING`: sedang dikerjakan.
-   `SUCCEEDED`: tahap selesai dengan output yang memenuhi kontrak.
-   `FAILED`: tahap gagal dan tidak dapat melanjutkan pipeline.
-   `SKIPPED`: tahap tidak dijalankan karena kondisi yang
    terdokumentasi.
-   `COMPLETED`: status terminal pipeline setelah semua tahap wajib
    selesai, bukan verdict validitas survei.

Jika implementasi menggunakan enum/status lain, pertahankan enum aktual
dan dokumentasikan pemetaannya; jangan menambah status baru hanya untuk
menyesuaikan dokumen.

------------------------------------------------------------------------

## 6. Tahap 1: Validasi input

**Tujuan:** memastikan file dan metadata memenuhi syarat untuk diproses.

**Modul terkait (sesuai struktur demo):** - `apps/web/` untuk alur
upload UI. - `apps/surveys/services.py` untuk layanan domain/upload. -
`apps/pipeline/metadata.py` untuk pemeriksaan metadata. -
`apps/surveys/storage.py` untuk penyimpanan file.

**Input:** - File PDF. - Metadata input yang diminta UI/API. - Identitas
pengguna jika tersedia dan relevan.

**Pemeriksaan:** - File ada dan dapat dibaca. - Format file sesuai
batasan PDF. - Ukuran/jumlah halaman berada dalam batas konfigurasi. -
Metadata wajib memenuhi aturan. - PDF tidak kosong dan dapat diproses
oleh ekstraktor. - Hash file dihitung untuk idempotensi/cache.

**Output contoh:**

``` json
{
  "input_validation": {
    "status": "SUCCEEDED",
    "file_name": "survei_kepercayaan_publik.pdf",
    "mime_type": "application/pdf",
    "sha256": "a4b1...9d20",
    "page_count": 18,
    "metadata": {
      "title": "Survei Kepercayaan Publik",
      "publisher": "Contoh Riset Indonesia"
    },
    "warnings": []
  }
}
```

Hash di atas hanyalah contoh ilustratif, bukan hash file demo yang
sebenarnya.

**Kegagalan:** - Format/ukuran tidak memenuhi syarat: tolak input dengan
pesan yang jelas. - File rusak atau tidak dapat dibaca: hentikan
pipeline. - Metadata wajib tidak valid: minta perbaikan sebelum
melanjutkan. - Hash sudah memiliki hasil yang dapat digunakan:
kembalikan hasil/cache sesuai kebijakan implementasi.

------------------------------------------------------------------------

## 7. Tahap 2: Ekstraksi teks PDF

**Tujuan:** menghasilkan teks yang mempertahankan batas halaman agar
evidence dapat dilacak.

**Modul terkait:** `apps/pipeline/pdf_text.py`; hasil dapat disimpan
melalui model `PageText`.

**Input:** PDF yang lulus validasi.

**Output contoh:**

``` json
{
  "document_text": {
    "status": "SUCCEEDED",
    "extractor": "pymupdf",
    "pages": [
      {
        "page_number": 1,
        "text": "Laporan Survei Kepercayaan Publik ...",
        "character_count": 1840
      },
      {
        "page_number": 2,
        "text": "Metodologi: survei dilakukan pada ...",
        "character_count": 2217
      }
    ],
    "total_pages": 18,
    "warnings": []
  }
}
```

**Persyaratan:** - Nomor halaman konsisten dengan nomor halaman dokumen
yang digunakan UI. - Teks disimpan per halaman, bukan hanya sebagai satu
string gabungan. - Teks kosong atau sangat sedikit harus memicu
pemeriksaan/rejection yang sesuai. - Jangan menyatakan OCR telah
dilakukan jika OCR tidak tersedia.

**Kegagalan:** PDF scan tanpa lapisan teks yang dapat diekstrak harus
ditolak atau ditandai tidak dapat diproses berdasarkan perilaku aktual
demo. Jangan mengarang isi halaman yang tidak terbaca.

------------------------------------------------------------------------

## 8. Tahap 3: Normalization Agent

**Tujuan:** mengubah teks laporan menjadi profil survei dan evidence
record terstruktur.

**Modul terkait:** - `apps/agents/normalization.py` -
`apps/agents/schemas.py` - `apps/agents/llm.py` atau adapter LLM yang
dipakai implementasi

**Input:** teks per halaman dari tahap ekstraksi.

**Field yang relevan dalam schema demo dapat mencakup:** - ukuran
sampel; - metode sampling; - margin of error yang diklaim; - confidence
level; - tanggal/periode fieldwork; - sponsor dan pelaksana survei; -
populasi sasaran; - geografi; - mode pengumpulan data; - weighting; -
disclosure/redaksi pertanyaan; - evidence record dengan nilai, satuan,
periode, geografi, definisi, halaman sumber, excerpt, dan field yang
tidak diketahui.

Field final wajib mengikuti `apps/agents/schemas.py`, bukan daftar ini
jika schema repository berubah.

**Output contoh (disederhanakan):**

``` json
{
  "survey_profile": {
    "title": {
      "value": "Survei Kepercayaan Publik",
      "source_page": 1,
      "source_excerpt": "Laporan Survei Kepercayaan Publik"
    },
    "sample_size": {
      "value": 1200,
      "unit": "respondents",
      "source_page": 3,
      "source_excerpt": "Sebanyak 1.200 responden diwawancarai ..."
    },
    "sampling_method": {
      "value": "stratified random sampling",
      "source_page": 4,
      "source_excerpt": "Pemilihan sampel menggunakan ..."
    },
    "claimed_margin_of_error": {
      "value": 2.8,
      "unit": "percent",
      "source_page": 3,
      "source_excerpt": "Margin of error sebesar ±2,8% ..."
    },
    "confidence_level": {
      "value": 95,
      "unit": "percent",
      "source_page": 3,
      "source_excerpt": "Pada tingkat kepercayaan 95% ..."
    },
    "fieldwork_dates": {
      "value": null,
      "status": "unknown"
    }
  },
  "evidence_records": [
    {
      "metric": "sample_size",
      "value": 1200,
      "unit": "respondents",
      "source_page": 3,
      "source_excerpt": "Sebanyak 1.200 responden diwawancarai ..."
    }
  ]
}
```

Semua angka, nama, dan kutipan di contoh ini fiktif untuk menjelaskan
bentuk output; bukan temuan aktual dari laporan tertentu.

**Persyaratan:** - Keluaran harus memenuhi schema Pydantic yang
digunakan demo. - Setiap nilai yang diekstrak harus membawa provenance
yang tersedia. - Informasi yang tidak ada harus direpresentasikan
sebagai unknown/null sesuai schema. - Agent tidak boleh menyimpulkan
metode sampling hanya dari ukuran sampel. - Klaim MoE dalam laporan
harus dibedakan dari MoE yang dihitung ulang oleh Rule Engine.

------------------------------------------------------------------------

## 9. Tahap 4: Schema QC dan grounding

**Tujuan:** memastikan output normalisasi valid secara struktural dan
dapat ditelusuri ke teks sumber.

**Modul terkait:** - `apps/pipeline/grounding.py` -
`apps/pipeline/qc.py` - `apps/agents/schemas.py`

**Pemeriksaan:** 1. Apakah payload valid terhadap schema? 2. Apakah
nomor halaman merujuk ke halaman yang tersedia? 3. Apakah excerpt dapat
ditemukan atau dicocokkan dengan teks sumber menurut algoritma
grounding? 4. Apakah nilai numerik yang dikutip memiliki dukungan di
sumber? 5. Apakah tingkat grounding keseluruhan memenuhi threshold
konfigurasi?

Implementasi demo menggunakan pencocokan teks yang dinormalisasi dan
dapat mencakup exact/compact/fuzzy matching serta pemeriksaan kehadiran
angka. Threshold yang disebutkan dalam implementasi dapat dikonfigurasi;
nilai default yang tercatat adalah 0,6. Perubahan threshold perlu
disertai tes dan dokumentasi.

**Output contoh:**

``` json
{
  "normalization_qc": {
    "schema_valid": true,
    "grounding_ratio": 0.92,
    "threshold": 0.60,
    "status": "SUCCEEDED",
    "evidence_checks": [
      {
        "field": "sample_size",
        "source_page": 3,
        "grounded": true,
        "reason": "excerpt_and_value_match"
      },
      {
        "field": "fieldwork_dates",
        "source_page": null,
        "grounded": null,
        "reason": "field_not_reported"
      }
    ],
    "warnings": [
      "fieldwork_dates tidak ditemukan dalam dokumen"
    ]
  }
}
```

Nilai `0.92` dan hasil pemeriksaan di atas adalah ilustrasi.

**Persyaratan interpretasi:** - Rasio grounding yang lolos tidak berarti
setiap field benar. Field yang tidak grounded tetap harus ditandai. - QC
grounding membuktikan keterlacakan terhadap dokumen yang diunggah, bukan
kredibilitas penerbit atau kebenaran eksternal dokumen. - Jika QC gagal,
pipeline dapat meminta retry terbatas sesuai konfigurasi. Setelah batas
percobaan tercapai, hentikan tahap dan simpan alasan kegagalan. - Jangan
mengubah `unknown` menjadi `false` hanya agar schema tampak lengkap.

------------------------------------------------------------------------

## 10. Tahap 5: Deterministic Rule Engine

**Tujuan:** menjalankan pemeriksaan yang hasilnya dapat direproduksi
dari input dan aturan yang jelas.

**Modul terkait:** - `apps/rules/engine.py` - `apps/rules/moe.py` -
`apps/rules/disclosure.py` - `apps/rules/types.py`

### 10.1 Pemeriksaan MoE

**Input:** ukuran sampel, claimed MoE, confidence level, dan
asumsi/parameter yang didukung rule saat ini.

**Tanggung jawab:** - menghitung ulang MoE hanya ketika input yang
diperlukan tersedia; - membandingkan hasil hitung dengan MoE yang
diklaim; - menyimpan asumsi, formula/versi rule, hasil, dan selisih bila
tersedia; - mengembalikan status tidak dapat diperiksa jika input atau
asumsi yang diperlukan tidak tersedia.

**Output contoh:**

``` json
{
  "rule_id": "moe_consistency",
  "status": "WARN",
  "inputs": {
    "sample_size": 1200,
    "claimed_moe_percent": 2.8,
    "confidence_level_percent": 95
  },
  "calculation": {
    "recomputed_moe_percent": 2.83,
    "assumptions": [
      "simple_random_sample",
      "proportion_0_5",
      "finite_population_correction_not_applied"
    ]
  },
  "difference_percentage_points": 0.03,
  "message": "Nilai MoE klaim mendekati hasil hitung pada asumsi yang digunakan.",
  "limitations": [
    "Pemeriksaan ini tidak membuktikan tidak adanya bias atau bahwa desain sampel benar-benar simple random sample."
  ]
}
```

Angka dan asumsi dalam contoh ini bersifat ilustratif. **Formula dan
asumsi final harus mengikuti `apps/rules/moe.py` yang aktual.** Jangan
menyalin asumsi contoh ke implementasi jika berbeda.

MoE tidak dapat digunakan sendirian untuk membuktikan representativitas,
kualitas instrumen, ketiadaan nonresponse bias, atau hubungan kausal.

### 10.2 Pemeriksaan disclosure

**Input:** field metodologi/disclosure yang berhasil diekstrak dan
status keberadaannya.

**Output contoh:**

``` json
{
  "rule_id": "disclosure_completeness",
  "status": "WARN",
  "checks": [
    {
      "field": "sampling_method",
      "status": "PRESENT"
    },
    {
      "field": "fieldwork_dates",
      "status": "MISSING"
    },
    {
      "field": "weighting",
      "status": "MISSING"
    }
  ],
  "message": "Beberapa informasi metodologi tidak ditemukan dalam laporan."
}
```

**Aturan interpretasi:** - `MISSING` berarti informasi tidak
ditemukan/dilaporkan, bukan otomatis berarti survei dilakukan secara
salah. - Status yang tersedia harus mengikuti enum aktual di
`apps/rules/types.py`. - Jika sebuah pemeriksaan tidak dapat dijalankan,
gunakan status setara `NOT_APPLICABLE`/`UNKNOWN` hanya jika memang
didukung implementasi. Jika belum didukung, dokumentasikan pemetaan
tanpa mengarang enum baru.

------------------------------------------------------------------------

## 11. Tahap 6: Analysis Agent

**Tujuan:** mengubah profil survei, evidence, dan hasil rule menjadi
ringkasan yang berguna bagi pembaca, tanpa mengganti hasil rule
deterministik.

**Modul terkait:** - `apps/agents/analysis.py` -
`apps/agents/schemas.py`

**Input:** - profil survei yang lolos QC; - evidence record dan
provenance; - hasil Rule Engine; - peringatan dan keterbatasan yang
sudah diketahui.

**Output yang didukung schema demo dapat mencakup:** - ringkasan; -
findings yang merujuk evidence/rule; - caveats; - spesifikasi
visualisasi, misalnya `metric_bar` atau `metric_table`.

**Output contoh:**

``` json
{
  "summary": "Laporan mencantumkan ukuran sampel dan klaim margin of error. Beberapa detail metodologi belum ditemukan dalam dokumen.",
  "findings": [
    {
      "title": "Ukuran sampel dinyatakan",
      "description": "Laporan menyebutkan 1.200 responden.",
      "evidence_refs": ["evidence_sample_size"],
      "rule_refs": []
    },
    {
      "title": "Klaim MoE perlu dibaca bersama asumsi",
      "description": "Perhitungan ulang mendekati angka yang dilaporkan pada asumsi rule yang digunakan.",
      "evidence_refs": ["evidence_claimed_moe", "evidence_sample_size"],
      "rule_refs": ["moe_consistency"]
    }
  ],
  "caveats": [
    "Kesesuaian MoE tidak membuktikan survei bebas bias.",
    "Tanggal fieldwork tidak ditemukan dalam dokumen."
  ],
  "visualizations": [
    {
      "type": "metric_table",
      "title": "Ringkasan pemeriksaan",
      "data_refs": ["moe_consistency", "disclosure_completeness"]
    }
  ]
}
```

Contoh ini menjelaskan pola output, bukan jaminan bahwa nama key persis
sama dengan schema repository.

**Persyaratan:** - Agent menyintesis evidence yang tersedia dan tidak
membuat angka baru. - Findings harus merujuk evidence/rule yang memang
ada. - Jangan menulis "survei valid" hanya karena MoE cocok atau
disclosure cukup lengkap. - Bedakan fakta dari laporan, hasil
perhitungan rule, dan interpretasi. - Visualisasi harus memakai data
yang ada dalam output terstruktur; jangan mengarang titik data.

------------------------------------------------------------------------

## 12. Tahap 7: Analysis QC

**Tujuan:** memeriksa output Analysis Agent sebelum disimpan dan
ditampilkan.

**Pemeriksaan:** - schema output valid; - semua evidence/rule reference
menunjuk ke ID yang tersedia; - visualisasi memakai referensi data yang
valid; - tidak ada referensi yang hilang; - output tidak melanggar
kontrak yang ditetapkan aplikasi.

**Output contoh:**

``` json
{
  "analysis_qc": {
    "schema_valid": true,
    "references_valid": true,
    "status": "SUCCEEDED",
    "warnings": []
  }
}
```

QC struktural bukan pemeriksa fakta sempurna. Bila demo belum memiliki
pemeriksaan semantik untuk klaim dalam narasi, jangan mengklaim bahwa
setiap kalimat telah diverifikasi secara otomatis.

Jika QC gagal, gunakan retry terbatas sesuai implementasi. Kegagalan
setelah retry harus dicatat dan tidak boleh ditampilkan sebagai hasil
sukses.

------------------------------------------------------------------------

## 13. Tahap 8: Persistensi dan status pipeline

**Tujuan:** menyimpan output tahap dan status yang dibutuhkan untuk
menampilkan hasil, audit, dan troubleshooting.

**Model yang relevan di demo dapat mencakup:** - `Survey` -
`SurveyProfile` - `EvidenceRecord` - `RuleResult` - `AnalysisResult` -
`PageText` - `PipelineAttempt`

Nama model/field aktual tetap ditentukan oleh kode repository.

**Data yang perlu dapat ditelusuri:** - file dan fingerprint/hash; -
teks per halaman; - profil survei; - evidence dan provenance; - hasil
rule; - ringkasan/findings/caveats/visualisasi; - status
tahap/pipeline; - percobaan, error, model/latency/prompt version jika
sudah direkam oleh implementasi.

**Output terminal contoh:**

``` json
{
  "survey_id": "surv_demo_001",
  "pipeline_status": "COMPLETED",
  "analysis_available": true,
  "rule_results_count": 2,
  "warnings_count": 2,
  "completed_at": "2026-10-22T10:30:00+07:00"
}
```

Semua ID dan timestamp di atas bersifat ilustratif.

`COMPLETED` hanya menandakan tahap wajib pipeline telah selesai. Status
hasil statistik harus dibaca dari `RuleResult`, `findings`, dan
`caveats`, bukan disimpulkan dari status pipeline.

------------------------------------------------------------------------

## 14. Tahap 9: Kartu Survei dan API

**Tujuan:** menyajikan hasil yang dapat dipahami dan dapat digunakan
ulang oleh sistem lain.

**Modul terkait:** - `apps/web/` untuk halaman Kartu Survei; -
`apps/api/` untuk serializer, URL, dan view API.

**Informasi yang ditampilkan jika tersedia:** - identitas/judul
survei; - ringkasan profil; - ukuran sampel, metode, periode, MoE, dan
field terkait; - status disclosure; - hasil pemeriksaan rule; - temuan
dan caveat; - grafik/tabel yang dibentuk dari spesifikasi visualisasi; -
provenance berupa halaman/kutipan bila sesuai desain UI.

**Kontrak UI:** - tampilkan "tidak dilaporkan" atau "tidak dapat
diperiksa" saat informasi tidak tersedia; - bedakan angka yang diklaim
laporan dari hasil hitung ulang; - tampilkan caveat dekat dengan metrik
yang dapat disalahartikan; - jangan mengubah status rule menjadi label
"survei valid" tanpa kriteria produk yang eksplisit dan bukti yang
memadai.

**Kontrak API:** - JSON mengikuti serializer/schema yang
diimplementasikan. - Jangan mengembalikan klaim kemampuan yang tidak
dilakukan pipeline. - API publik hanya mengekspos data yang memang
dimaksudkan publik; jangan menyertakan file internal, rahasia provider,
prompt privat, atau data sensitif yang tidak perlu. - CSV, jika belum
ada dalam demo saat ini, tetap dianggap pengembangan terpisah.

------------------------------------------------------------------------

## 15. Penanganan kegagalan dan retry

  -----------------------------------------------------------------------
  Kondisi                             Perilaku yang diharapkan
  ----------------------------------- -----------------------------------
  File tidak valid                    Tolak input sebelum pipeline
                                      berjalan

  PDF tidak memiliki teks yang dapat  Tolak atau tandai tidak dapat
  diekstrak                           diproses; tidak ada OCR kecuali
                                      ditambahkan secara eksplisit

  Normalization Agent menghasilkan    QC gagal; retry terbatas jika
  schema invalid                      didukung

  Evidence tidak grounded             Tandai evidence bermasalah; jika
                                      ambang/aturan QC gagal, retry atau
                                      hentikan sesuai kebijakan

  Rule tidak memiliki input cukup     Keluarkan status tidak dapat
                                      diperiksa jika didukung; jangan
                                      mengarang hasil

  Analysis Agent gagal                Retry terbatas; jika tetap gagal,
                                      catat kegagalan dan jangan
                                      berpura-pura hasil lengkap

  Referensi analisis tidak valid      Analysis QC gagal

  Provider LLM gagal                  Catat error/attempt; terapkan retry
                                      yang dikonfigurasi

  File/hash pernah diproses           Gunakan hasil cache/idempotensi
                                      jika masih valid
  -----------------------------------------------------------------------

Batas retry aktual harus mengikuti konfigurasi repository. Dokumen ini
tidak menetapkan angka baru jika konfigurasi tersebut belum
diverifikasi.

## 16. Contoh ringkas aliran data end-to-end

Contoh berikut bersifat sintetis dan hanya menunjukkan transformasi data
antar-tahap.

**Input pengguna**

``` json
{
  "file": "survei_kepercayaan_publik.pdf",
  "metadata": {
    "title": "Survei Kepercayaan Publik",
    "publisher": "Contoh Riset Indonesia"
  }
}
```

**Setelah ekstraksi**

``` json
{
  "pages": [
    {
      "page_number": 3,
      "text": "Sebanyak 1.200 responden ... Margin of error ±2,8% ..."
    }
  ]
}
```

**Setelah normalisasi**

``` json
{
  "sample_size": 1200,
  "claimed_moe_percent": 2.8,
  "confidence_level_percent": 95,
  "evidence": [
    {
      "field": "sample_size",
      "page": 3,
      "excerpt": "Sebanyak 1.200 responden"
    }
  ]
}
```

**Setelah grounding**

``` json
{
  "schema_valid": true,
  "sample_size_grounded": true,
  "claimed_moe_grounded": true,
  "overall_grounding_passed": true
}
```

**Setelah rules**

``` json
{
  "rules": [
    {
      "id": "moe_consistency",
      "status": "WARN",
      "message": "Hasil mendekati klaim pada asumsi perhitungan yang digunakan."
    },
    {
      "id": "disclosure_completeness",
      "status": "WARN",
      "message": "Beberapa disclosure metodologi belum ditemukan."
    }
  ]
}
```

**Setelah analisis**

``` json
{
  "summary": "Laporan menyebutkan ukuran sampel dan klaim MoE, tetapi hasil harus dibaca bersama asumsi dan disclosure metodologi.",
  "caveats": [
    "MoE saja tidak membuktikan ketiadaan bias.",
    "Beberapa detail metodologi tidak dilaporkan."
  ]
}
```

**Hasil akhir**

``` json
{
  "pipeline_status": "COMPLETED",
  "card_available": true,
  "interpretation": "Baca hasil rule dan caveat; jangan menyimpulkan validitas total hanya dari status proses."
}
```

## 17. Observability dan audit

Untuk setiap run, sistem sebaiknya dapat menjawab: - Tahap mana yang
terakhir berhasil? - Tahap mana yang gagal dan mengapa? - Berapa kali
agent dicoba ulang? - Model/provider dan prompt version apa yang
digunakan, jika tersedia? - Evidence apa yang mendukung suatu field atau
finding? - Rule versi apa yang menghasilkan hasil pemeriksaan? - Apakah
output berasal dari cache atau pemrosesan baru?

Jangan menyimpan secret API key, credential, atau informasi provider
sensitif di log.

## 18. Acceptance criteria demo

1.  PDF digital yang valid dapat melalui pipeline sampai hasil akhir.
2.  PDF tidak dapat diproses ditolak dengan alasan yang dapat dipahami.
3.  Teks hasil ekstraksi mempertahankan nomor halaman.
4.  Field profil yang diekstrak memiliki provenance bila ditemukan di
    dokumen.
5.  Informasi yang tidak ditemukan tetap unknown/null, bukan direka.
6.  QC memvalidasi schema dan menjalankan grounding sesuai implementasi.
7.  Rule Engine menghasilkan output terstruktur untuk pemeriksaan MoE
    dan disclosure.
8.  Jika input rule tidak cukup, sistem tidak mengarang hasil
    perhitungan.
9.  Analysis Agent hanya merujuk evidence dan rule yang tersedia.
10. Analysis QC memeriksa schema dan referensi sebelum hasil
    dipersistenkan.
11. Hasil yang selesai dapat ditampilkan di Kartu Survei dan endpoint
    JSON sesuai implementasi demo.
12. Status `COMPLETED` tidak diperlakukan sebagai verdict bahwa survei
    valid.
13. Kegagalan dan retry tercatat sesuai kemampuan
    `PipelineAttempt`/logging yang tersedia.
14. Contoh output dalam dokumentasi diberi label sintetis, bukan
    disajikan sebagai hasil survei nyata.

## 19. Pemetaan modul

  -----------------------------------------------------------------------
  Tanggung jawab                      Modul utama
  ----------------------------------- -----------------------------------
  Upload/UI                           `apps/web/`

  Domain survei dan persistensi       `apps/surveys/`

  Ekstraksi teks PDF dan metadata     `apps/pipeline/pdf_text.py`,
                                      `metadata.py`

  Orkestrasi pipeline                 `apps/pipeline/orchestrator.py`

  Normalisasi/analisis AI             `apps/agents/`

  Schema payload                      `apps/agents/schemas.py`

  Grounding dan QC                    `apps/pipeline/grounding.py`,
                                      `qc.py`

  Pemeriksaan deterministik           `apps/rules/`

  API                                 `apps/api/`
  -----------------------------------------------------------------------

Pemetaan ini mencerminkan struktur utama demo yang telah dideskripsikan.
Nama file dan field harus diverifikasi terhadap branch repository yang
sedang dipakai sebelum dijadikan kontrak implementasi yang mengikat.

## 20. Arah pengembangan setelah demo

Pipeline generik untuk evaluasi klaim di masa depan dapat berkembang
menjadi:

``` text
Claim
  -> Source Resolution
  -> Document Extraction
  -> Evidence Normalization
  -> Evidence Validation
  -> Statistical/Domain Analysis
  -> Claim Evaluation
  -> Evidence-backed Explanation
```

Ini **bukan** deskripsi kemampuan demo saat ini. Untuk tahap berikutnya,
abstraksi `Claim`, `Source`, dan `Evaluation` dapat diperkenalkan saat
use case dan schema-nya sudah jelas. Jangan memaksa semua laporan survei
ke abstraksi generik sebelum kebutuhan nyata menuntutnya.

------------------------------------------------------------------------

## Catatan implementasi

Sebelum memakai dokumen ini sebagai spesifikasi final: 1. Cocokkan nama
field dan enum dengan `apps/agents/schemas.py` dan
`apps/rules/types.py`. 2. Cocokkan formula/asumsi MoE dengan
`apps/rules/moe.py`. 3. Cocokkan threshold grounding dan batas retry
dengan konfigurasi aktual. 4. Cocokkan endpoint dan field API dengan
serializer/view yang benar-benar tersedia. 5. Perbarui dokumen bila kode
berubah; spesifikasi yang tidak mengikuti implementasi hanya menjadi
fiksi administratif dengan format Markdown.
