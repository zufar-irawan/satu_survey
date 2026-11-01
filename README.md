# Satu Survey
Sebuah platform yang menganalisis laporan hasil survey statistik untuk kamu yang penasaran dengan bagaimana claim dari survey tersebut valid. Cara kerjanya sederhana:
1. Kamu masukkan pdf hasil laporan survey ke program kami
2. Program kami mengekstrak metadata PDF mu
3. Mengirim PDF mu untuk dinormalisasi dalam bentuk JSON oleh Agent normalisasi kami.
4. Hasil normalisasi akan dianalisis dalam oleh Agent analisis agar diberikan insight
5. Lalu outputnya di visualisasikan dalam bentuk yang mudah dimengerti

## Tech Stack:
1. Frontend: Next.js, tailwind
2. Backend: Django, Sqlite (Buat sementara, kedepannya ganti ke postgre)
3. CI/CD: Git, Docker

## Catatan Pengembangan:
1. Frontend masih dalam tahap pengembangan, sehingga kami menggunakan views dari Django untuk melakukan testing sementara waktu.
2. LLM masih pakai FakeLLMClient (We're too broke to have real model ngl😭)
3. Diharap kamu untuk membaca dokumen2 yang ada di direktori /docs untuk mengerti konsep, alur kerja sistem, hingga arsitektur sistem kami.

## Cara Running APP:
### Prasyarat

Sebelum memulai, pastikan perangkat kamu sudah terpasang:

* **Python** (versi 3.10 atau yang lebih baru)
* **Git**
* **Pip** (Python Package Manager)

### 🛠️ Langkah-Langkah Instalasi

#### 1. Clone Repository

Buka terminal/command prompt, lalu jalankan perintah berikut untuk meng-clone repository:

```bash
git clone https://github.com/zufar-irawan/satu_survey.git
cd satu_survey/backend

```

---

#### 2. Buat dan Aktifkan Virtual Environment

Sangat disarankan untuk menggunakan *virtual environment* agar dependensi proyek tidak bentrok dengan paket Python global.

* **Linux / macOS:**
```bash
python3 -m venv venv
source venv/bin/activate

```


* **Windows (Command Prompt):**
```cmd
python -m venv venv
venv\Scripts\activate

```


* **Windows (PowerShell):**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1

```



---

#### 3. Install Dependensi

Install semua paket yang dibutuhkan proyek dengan menjalankan:

```bash
pip install -r requirements.txt

```

---

#### 4. Konfigurasi Environment Variable (`.env`)

Salin berkas contoh `.env.example` menjadi `.env`:

* **Linux / macOS / Git Bash:**
```bash
cp .env.example .env

```


* **Windows (CMD / PowerShell):**
```cmd
copy .env.example .env

```

Buka berkas `.env` dan sesuaikan nilainya dengan konfigurasi, tapi karena kita belum menggunakan provider LLM nyata asli, jadi tidak banyak yang diubah di .env (Paling copy paste dari .env.example aja).

---

#### 5. Jalankan Migrasi Database

Jalankan perintah berikut untuk membuat struktur tabel di database:

```bash
python manage.py migrate

```

---

#### 6. (Opsional) Buat Superuser / Akun Admin

Jika kamu memerlukan akses ke halaman Django Admin, buat akun administrator dengan menjalankan:

```bash
python manage.py createsuperuser

```

Ikuti petunjuk di terminal untuk mengisi *username*, *email*, dan *password*.

---

#### 7. Jalankan Server Lokal

Jalankan Development Server Django:

```bash
python manage.py runserver

```

Buka browser kamu dan akses aplikasi di:
👉 **`[http://127.0.0.1:8000/](http://127.0.0.1:8000/)`** (atau `http://localhost:8000/`)

---

### 💡 Troubleshooting Ringkas

* **Gagal mengaktifkan venv di PowerShell Windows:**
Jalankan PowerShell sebagai Administrator dan ketik:
`Set-ExecutionPolicy Unrestricted -Scope Process`
* **Port 8000 sudah digunakan:**
Jalankan server di port lain, contoh: `python manage.py runserver 8080`
