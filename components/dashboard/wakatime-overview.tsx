"use client";

import { useEffect, useMemo, useState } from "react";
import type { WakaTimeApiResponse } from "@/lib/wakatime-types";
import { WakaTimeStatCard } from "@/components/dashboard/wakatime-stat-card";

interface WakaTimeOverviewProps {
  initialData?: WakaTimeApiResponse | null;
}

export function WakaTimeOverview({ initialData = null }: WakaTimeOverviewProps) {
  const [data, setData] = useState<WakaTimeApiResponse | null>(initialData);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchWakaTime() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/wakatime", { cache: "no-store" });

        if (!response.ok) {
          const payload = (await response.json().catch(() => null)) as
            | { error?: string }
            | null;
          throw new Error(payload?.error ?? "Failed to fetch WakaTime stats.");
        }

        const payload = (await response.json()) as WakaTimeApiResponse;
        if (active) {
          setData(payload);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to fetch WakaTime stats.");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    fetchWakaTime();
    const interval = setInterval(fetchWakaTime, 60000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const summary = data?.summary;
  const lastUpdatedText = useMemo(() => {
    if (!data?.updatedAt) {
      return null;
    }

    const parsed = new Date(data.updatedAt);
    if (Number.isNaN(parsed.getTime())) {
      return null;
    }

    return parsed.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [data?.updatedAt]);

  return (
    <section className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <WakaTimeStatCard
          label="Total Time Coded"
          value={summary?.totalTimeText ?? (isLoading ? "Loading..." : "N/A")}
          bgColor="#FF6F4C"
          subtitle="since sep 2 2024"
        />
        <WakaTimeStatCard
          label="Daily Average"
          value={summary?.dailyAverageText ?? (isLoading ? "Loading..." : "N/A")}
          bgColor="#84A1F0"
          subtitle="Over a Year"
        />
        <WakaTimeStatCard
          label="Best Day"
          value={summary?.bestDayText ?? (isLoading ? "Loading..." : "N/A")}
          bgColor="#3C905E"
          subtitle={summary?.bestDayDate ? new Date(summary.bestDayDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : undefined}
        />
      </div>

      <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <div className={`w-1.5 h-1.5 rounded-full ${error ? 'bg-red-500' : 'bg-green-500'} ${!error && 'animate-pulse'}`} />
        <p className="text-xs" >{error ? `Error: ${error}` : "Live synced from WakaTime"}</p>
        {lastUpdatedText && !error && (
          <>
            <span>•</span>
            <p className="text-xs" >Updated at {lastUpdatedText}</p>
          </>
        )}
      </div>
    </section>
  );
}
