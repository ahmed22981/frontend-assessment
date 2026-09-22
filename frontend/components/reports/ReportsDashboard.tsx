"use client";

import {useReports} from "@/hooks/useReports";
import {StatCard} from "./StatCard";

export function ReportsDashboard() {
  const {summary, loading, error, fetchReports} = useReports();

  if (loading) {
    return (
      <section className="card" style={{padding: "1rem"}}>
        <p style={{margin: 0}}>Loading reports data...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className="card"
        style={{padding: "1rem", borderColor: "#e3b4c0", background: "#fff8fa"}}
      >
        <p
          style={{
            marginTop: 0,
            marginBottom: "0.75rem",
            color: "var(--danger)",
          }}
        >
          {error}
        </p>
        <button type="button" className="button" onClick={fetchReports}>
          Retry
        </button>
      </section>
    );
  }

  if (!summary) return null;

  return (
    <section className="stack">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        <StatCard title="Total Tasks" value={summary.total} />
        <StatCard title="Recent Activity" value={summary.recentActivityCount} />
      </div>

      <section className="card" style={{padding: "1.5rem"}}>
        <h3 style={{marginTop: 0, marginBottom: "1.5rem", textAlign: "center"}}>
          Tasks Breakdown by Status
        </h3>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          <div style={{textAlign: "center"}}>
            <p style={{margin: "0 0 0.5rem 0", color: "var(--muted)"}}>Todo</p>
            <span
              className="badge"
              style={{fontSize: "1.2rem", padding: "0.5rem 1.5rem"}}
            >
              {summary.byStatus.todo}
            </span>
          </div>

          <div style={{textAlign: "center"}}>
            <p style={{margin: "0 0 0.5rem 0", color: "var(--muted)"}}>
              In Progress
            </p>
            <span
              className="badge"
              style={{fontSize: "1.2rem", padding: "0.5rem 1.5rem"}}
            >
              {summary.byStatus["in-progress"]}
            </span>
          </div>

          <div style={{textAlign: "center"}}>
            <p style={{margin: "0 0 0.5rem 0", color: "var(--muted)"}}>Done</p>
            <span
              className="badge"
              style={{
                fontSize: "1.2rem",
                padding: "0.5rem 1.5rem",
                background: "var(--primary-soft)",
                color: "var(--primary)",
                borderColor: "var(--primary)",
              }}
            >
              {summary.byStatus.done}
            </span>
          </div>
        </div>
      </section>
    </section>
  );
}
