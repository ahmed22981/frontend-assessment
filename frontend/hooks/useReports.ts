"use client";

import {useState, useEffect, useCallback} from "react";
import type {TasksSummary, ErrorResponse} from "@/types/api";

export function useReports() {
  const [summary, setSummary] = useState<TasksSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/reports");
      if (!response.ok) {
        const body = (await response.json()) as ErrorResponse;
        throw new Error(
          body.error?.message || `Request failed with ${response.status}`,
        );
      }
      const data = (await response.json()) as TasksSummary;
      setSummary(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Could not load reports.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return {summary, loading, error, fetchReports};
}
