"use client";

import {useState, useEffect, useMemo, useCallback} from "react";
import type {ActivityLog} from "@/types/api";

export function useActivity() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchActivity = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/activity");
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = (await response.json()) as ActivityLog[];
      setActivities(data || []);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not load activity logs.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  const filteredActivity = useMemo(() => {
    if (!query.trim()) {
      return activities;
    }
    const lowerQuery = query.toLocaleLowerCase();
    return activities.filter(
      (item) =>
        (item.action || "").toLocaleLowerCase().includes(lowerQuery) ||
        (item.info || "").toLocaleLowerCase().includes(lowerQuery),
    );
  }, [activities, query]);

  return {
    activities,
    filteredActivity,
    query,
    setQuery,
    loading,
    error,
    fetchActivity,
  };
}
