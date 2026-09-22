type StatCardProps = {
  title: string;
  value: string | number;
};
export function StatCard({title, value}: StatCardProps) {
  return (
    <div className="card" style={{padding: "1.5rem", textAlign: "center"}}>
      <h3
        style={{
          margin: "0 0 0.5rem 0",
          color: "var(--muted)",
          fontSize: "1rem",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "var(--primary)",
        }}
      >
        {value}
      </p>
    </div>
  );
}
