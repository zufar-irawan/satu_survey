"use client";

import { useCallback, useEffect, useState } from "react";
import { api, type AnalysisListItem, type AnalyzeResponse } from "./api";
import { useAuth } from "@/components/auth-provider";

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
    if (!authLoading) void refresh();
  }, [authLoading, refresh]);

  return { analyses, loading: authLoading || loading, error, refresh };
}

export function useAnalysis(analysisId: string | null | undefined) {
  const { user } = useAuth();
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!user || !analysisId) {
      setResult(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      setResult(await api.getAnalysis(analysisId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat analisis");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, [analysisId, user]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { result, loading, error, refresh, setResult };
}
