import type {Task} from "@/types/api";

type TaskItemProps = {
  task: Task;
  busy: boolean;
  onToggle: (task: Task) => void;
  onDelete: (taskId: string) => void;
};

export function TaskItem({task, busy, onToggle, onDelete}: TaskItemProps) {
  return (
    <li
      className="card"
      style={{
        padding: "0.85rem",
        display: "grid",
        gap: "0.4rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "0.8rem",
          alignItems: "start",
        }}
      >
        <p style={{margin: 0, fontWeight: 600}}>{task.title}</p>
        <span className="badge">
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <small
        style={{
          color: "var(--muted)",
          fontSize: "0.85rem",
          display: "block",
          marginBottom: "0.5rem",
        }}
      >
        Updated:{" "}
        {new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date(task.updatedAt))}
      </small>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          type="button"
          className="button"
          onClick={() => onToggle(task)}
          disabled={busy}
          aria-label={`Mark ${task.title} as ${task.completed ? "pending" : "completed"}`}
        >
          {busy
            ? "Saving..."
            : task.completed
              ? "Mark as Pending"
              : "Mark as Completed"}
        </button>

        <button
          type="button"
          className="button"
          onClick={() => onDelete(task.id)}
          disabled={busy}
          style={{
            color: "var(--danger)",
            borderColor: "#ffcbd5",
            background: "#fff0f3",
          }}
        >
          {busy ? "..." : "Delete"}
        </button>
      </div>
    </li>
  );
}
