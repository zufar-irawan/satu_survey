import { getToken, removeToken } from "./auth";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

export type User = {
  id: string;
  username: string;
  email: string | null;
};

export type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };

export type TokenResponse = {
  access_token: string;
  token_type: string;
};

export type UserRegister = {
  username: string;
  email?: string | null;
  password: string;
};

export type AnalysisSummary = {
  total_claims: number;
  valid: number;
  questionable: number;
  invalid: number;
  insufficient_evidence: number;
};

export type Verdict =
  | "valid"
  | "questionable"
  | "invalid"
  | "insufficient_evidence"
  | string;

export type EvidenceItem = {
  id?: string;
  metric?: string | null;
  value?: number | string | null;
  raw_value?: string | null;
  unit?: string | null;
  population?: string | null;
  geography?: string | null;
  period?: string | null;
  sample_size?: number | null;
  raw_excerpt?: string | null;
  page_number?: number | null;
  document_id?: string | null;
};

export type ClaimMetric = {
  metric?: string | null;
  value?: number | string | null;
  raw_value?: string | null;
  unit?: string | null;
  period?: string | null;
  population?: string | null;
  geography?: string | null;
  page_number?: number | null;
};

export type ClaimViz = {
  claim_id: string;
  statement: string | null;
  raw_excerpt: string | null;
  page_number: number | null;
  verdict: Verdict;
  confidence: number | null;
  explanation: string | null;
  evidence: EvidenceItem[];
  metrics: Record<string, ClaimMetric>;
  limitations: string[];
};

export type QCIssue = {
  type?: string;
  severity?: string;
  message?: string;
  claim_id?: string | null;
  evaluation_id?: string | null;
};

export type QCReportSchema = {
  status: string;
  issues: QCIssue[];
  corrections: string[];
  needs_reevaluation?: string[];
};

export type VerdictDistributionItem = {
  verdict?: string;
  count?: number;
};

export type StatisticalComparison = {
  claim_id?: string;
  evidence_id?: string;
  metric?: string | null;
  value?: number | string | null;
  unit?: string | null;
  period?: string | null;
};

export type TimeSeriesItem = {
  claim_id?: string;
  period?: string | null;
  value?: number | string | null;
  metric?: string | null;
};

export type Visualizations = {
  verdict_distribution: VerdictDistributionItem[];
  statistical_comparisons: StatisticalComparison[];
  time_series: TimeSeriesItem[];
};

export type DocumentInfo = {
  title: string | null;
  publisher: string | null;
  publication_date: string | null;
};

export type AnalyzeResponse = {
  analysis_id: string;
  document: DocumentInfo;
  summary: AnalysisSummary;
  claims: ClaimViz[];
  visualizations: Visualizations;
  quality_control: QCReportSchema;
};

export type AnalysisListItem = {
  analysis_id: string;
  title: string;
  filename: string | null;
  status: string;
  created_at: string;
  summary: AnalysisSummary;
};

export type AnalysisStatus = "queued" | "processing" | "completed" | "failed";

export type AnalyzeUploadResponse = {
  analysis_id: string;
  job_id: string | null;
  status: AnalysisStatus;
  deduplicated: boolean;
};

export type AnalysisStatusResponse = {
  analysis_id: string;
  status: AnalysisStatus;
  error: string | null;
};

export type ShareLinkResponse = {
  analysis_id: string;
  share_token: string;
  share_url: string | null;
  shared_at: string | null;
};

type RequestInitOverride = Omit<RequestInit, "body"> & {
  body?: Json | FormData;
  auth?: boolean;
  formData?: boolean;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function isFormData(value: unknown): value is FormData {
  return typeof FormData !== "undefined" && value instanceof FormData;
}

async function readErrorDetail(res: Response): Promise<string> {
  const fallback = `Permintaan gagal (${res.status})`;
  const text = await res.text().catch(() => "");
  if (!text) return fallback;

  try {
    const parsed = JSON.parse(text) as { detail?: unknown };
    const detail = parsed.detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail)) {
      const messages = detail
        .map((item) => {
          if (item && typeof item === "object" && "msg" in item) {
            return String((item as { msg: unknown }).msg);
          }
          return JSON.stringify(item);
        })
        .filter(Boolean);
      if (messages.length) return messages.join("; ");
    }
    if (detail) return JSON.stringify(detail);
  } catch {
    // Response was not JSON.
  }

  return text.length > 300 ? `${text.slice(0, 300)}...` : text;
}

async function request<T>(
  path: string,
  opts: RequestInitOverride = {}
): Promise<T> {
  const { auth = false, formData = false, body, ...rest } = opts;
  const headers: Record<string, string> = {};

  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  if (!formData && body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...rest,
      headers: { ...headers, ...(rest.headers as Record<string, string>) },
      body: formData
        ? (body as BodyInit | undefined)
        : body !== undefined
          ? JSON.stringify(body)
          : undefined,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Permintaan dibatalkan.");
    }
    throw new Error(
      `Tidak dapat terhubung ke backend di ${API_URL}. Pastikan server FastAPI sedang berjalan dan CORS sudah dikonfigurasi.`
    );
  }

  if (!res.ok) {
    const detail = await readErrorDetail(res);
    if (res.status === 401 && auth && typeof window !== "undefined") {
      removeToken();
      window.dispatchEvent(new Event("satusurvey:unauthorized"));
    }
    throw new ApiError(detail, res.status);
  }

  if (res.status === 204) return undefined as unknown as T;
  const text = await res.text();
  if (!text) return undefined as unknown as T;
  return JSON.parse(text) as T;
}

export const api = {
  register: (data: UserRegister) =>
    request<{ message: string; user_id: string }>("/auth/register", {
      method: "POST",
      body: data as unknown as Json,
    }),

  login: async (username: string, password: string) => {
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);
    return request<TokenResponse>("/auth/login", {
      method: "POST",
      formData: true,
      body: form,
    });
  },

  getMe: () => request<User>("/users/me", { method: "GET", auth: true }),

  analyzePdf: (file: File, signal?: AbortSignal, force = false) => {
    const form = new FormData();
    form.append("file", file);
    if (force) form.append("force", "true");
    return request<AnalyzeUploadResponse>("/analyze", {
      method: "POST",
      formData: true,
      body: form,
      auth: true,
      signal,
    });
  },

  listAnalyses: () =>
    request<AnalysisListItem[]>("/analyses", { method: "GET", auth: true }),

  getAnalysis: (analysisId: string) =>
    request<AnalyzeResponse>(`/analyses/${encodeURIComponent(analysisId)}`, {
      method: "GET",
      auth: true,
    }),

  getAnalysisStatus: (analysisId: string) =>
    request<AnalysisStatusResponse>(
      `/analyses/${encodeURIComponent(analysisId)}/status`,
      { method: "GET", auth: true }
    ),

  shareAnalysis: (analysisId: string) =>
    request<ShareLinkResponse>(
      `/analyses/${encodeURIComponent(analysisId)}/share`,
      { method: "POST", auth: true }
    ),

  unshareAnalysis: (analysisId: string) =>
    request<void>(`/analyses/${encodeURIComponent(analysisId)}/share`, {
      method: "DELETE",
      auth: true,
    }),

  getSharedAnalysis: (token: string) =>
    request<AnalyzeResponse>(
      `/public/analyses/${encodeURIComponent(token)}`,
      { method: "GET", auth: false }
    ),
};

export { API_URL, isFormData };
