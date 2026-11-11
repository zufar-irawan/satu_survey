"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ApiError,
  api,
  type AnalysisListItem,
  type AnalysisStatus,
  type AnalyzeResponse,
} from "./api";
import { useAuth } from "@/components/auth-provider";

const POLL_INTERVAL_MS = 2500;

type AnalysisState = {
  key: string;
  result: AnalyzeResponse | null;
  loading: boolean;
  polling: boolean;
  status: AnalysisStatus | null;
  error: string | null;
};

const EMPTY_ANALYSIS_STATE: AnalysisState = {
  key: "",
  result: null,
  loading: false,
  polling: false,
  status: null,
  error: null,
};

export function useAnalyses() {
  const { user, loading: authLoading } = useAuth();
  const [analyses, setAnalyses] = useState<AnalysisListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!user) {
      setAnalyses([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      setAnalyses(await api.listAnalyses());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat riwayat");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    let cancelled = false;

    (async () => {
      if (!user) {
        setAnalyses([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await api.listAnalyses();
        if (!cancelled) setAnalyses(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Gagal memuat riwayat");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authLoading, user]);

  return { analyses, loading: authLoading || loading, error, refresh };
}

export function useAnalysis(analysisId: string | null | undefined) {
  const { user } = useAuth();
  const [state, setState] = useState<AnalysisState>(EMPTY_ANALYSIS_STATE);
  const [refreshKey, setRefreshKey] = useState(0);

  const runKey = `${user?.id ?? ""}:${analysisId ?? ""}:${refreshKey}`;
  const active = Boolean(user && analysisId);
  const current = state.key === runKey ? state : null;

  const result = active ? current?.result ?? null : null;
  const loading = active ? current?.loading ?? true : false;
  const polling = active ? current?.polling ?? false : false;
  const status = active ? current?.status ?? null : null;
  const error = active ? current?.error ?? null : null;

  const refresh = useCallback(() => {
    setRefreshKey((key) => key + 1);
  }, []);

  const setResult = useCallback(
    (next: AnalyzeResponse | null) => {
      setState((prev) => {
        const base =
          prev.key === runKey
            ? prev
            : { ...EMPTY_ANALYSIS_STATE, key: runKey };
        return { ...base, key: runKey, result: next };
      });
    },
    [runKey]
  );

  useEffect(() => {
    if (!active || !analysisId) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const apply = (patch: Partial<AnalysisState>) => {
      if (cancelled) return;
      setState((prev) => {
        const base =
          prev.key === runKey
            ? prev
            : { ...EMPTY_ANALYSIS_STATE, key: runKey, loading: true };
        return { ...base, ...patch, key: runKey };
      });
    };

    const schedule = () => {
      if (cancelled) return;
      timer = setTimeout(() => void poll(), POLL_INTERVAL_MS);
    };

    const poll = async () => {
      if (cancelled) return;
      try {
        const currentStatus = await api.getAnalysisStatus(analysisId);
        if (cancelled) return;
        apply({ status: currentStatus.status });

        if (currentStatus.status === "completed") {
          apply({ polling: true });
          try {
            const full = await api.getAnalysis(analysisId);
            if (cancelled) return;
            apply({
              result: full,
              error: null,
              loading: false,
              polling: false,
            });
          } catch (err) {
            if (cancelled) return;
            apply({
              error:
                err instanceof Error ? err.message : "Gagal memuat analisis",
              result: null,
              loading: false,
              polling: false,
            });
          }
          return;
        }

        if (currentStatus.status === "failed") {
          apply({
            error: currentStatus.error || "Analisis gagal diproses.",
            result: null,
            loading: false,
            polling: false,
          });
          return;
        }

        apply({ loading: false, polling: true });
        schedule();
      } catch (err) {
        if (cancelled) return;
        apply({
          error: err instanceof Error ? err.message : "Gagal memuat analisis",
          result: null,
          loading: false,
          polling: false,
        });
        if (err instanceof ApiError && err.status === 404) return;
      }
    };

    void poll();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [active, analysisId, runKey]);

  return { result, loading, polling, status, error, refresh, setResult };
}