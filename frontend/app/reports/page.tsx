import Link from "next/link";
import {ReportsDashboard} from "@/components/reports/ReportsDashboard";

export default function ReportsPage() {
  return (
    <main className="stack">
      <nav>
        <Link href="/" className="button">
          Back
        </Link>
      </nav>
      <header className="card" style={{padding: "1rem"}}>
        <h1 style={{marginTop: 0, marginBottom: "0.5rem"}}>System Reports</h1>
      </header>

      <ReportsDashboard />
    </main>
  );
}
