"use client";

import Link from "next/link";
import {useActivity} from "@/hooks/useActivity";

export function formatTime(value: string) {
  return new Date(value).toLocaleString();
}

export default function ActivityPage() {
  const {
    filteredActivity,
    query,
    setQuery,
    loading,
    error,
    fetchActivity,
    activities,
  } = useActivity();

  return (
    <main className="stack">
      <nav>
        <Link href="/" className="button">
          Back
        </Link>
      </nav>

      <section className="card" style={{padding: "1rem"}}>
        <h1 style={{marginTop: 0, marginBottom: "0.5rem"}}>Activity Feed</h1>
        <input
          className="input"
          placeholder="Search activity..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading || !!error}
        />
      </section>

      {loading ? (
        <section className="card" style={{padding: "1rem"}}>
          <p style={{margin: 0}}>Loading activity logs...</p>
        </section>
      ) : null}

      {error ? (
        <section
          className="card"
          style={{
            padding: "1rem",
            borderColor: "#e3b4c0",
            background: "#fff8fa",
          }}
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
          <button type="button" className="button" onClick={fetchActivity}>
            Retry
          </button>
        </section>
      ) : null}

      {!loading && !error ? (
        <>
          <section className="card" style={{padding: "1rem"}}>
            <small style={{color: "var(--muted)"}}>
              Total: {activities.length} | Visible: {filteredActivity.length}
            </small>
          </section>

          {filteredActivity.length === 0 ? (
            <section className="card" style={{padding: "1rem"}}>
              <p style={{margin: 0, color: "var(--muted)"}}>
                No activity logs found.
              </p>
            </section>
          ) : (
            <section className="card" style={{padding: "1rem"}}>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  display: "grid",
                  gap: "0.7rem",
                }}
              >
                {filteredActivity.map((item) => (
                  <li
                    key={item.id}
                    style={{
                      borderBottom: "1px solid var(--border)",
                      paddingBottom: "0.6rem",
                    }}
                  >
                    <div style={{fontWeight: 600}}>
                      {item.action || "(no action)"}
                    </div>
                    <div>{item.info || "(no info)"}</div>
                    <small style={{color: "var(--muted)"}}>
                      {formatTime(item.when)}
                    </small>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      ) : null}
    </main>
  );
}
