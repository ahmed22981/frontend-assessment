"use client";

import {useTasks} from "@/hooks/useTasks";
import type {Task} from "@/types/api";
import {StatusFilter} from "@/components/tasks/StatusFilter";
import {TaskList} from "@/components/tasks/TaskList";
import {useState} from "react";

export function TaskDashboard() {
  const {
    filteredTasks,
    filter,
    loading,
    error,
    updatingTaskId,
    setFilter,
    fetchTasks,
    updateTaskStatus,
    createTask,
    deleteTask,
    creatingTask,
  } = useTasks();

  const handleToggle = (task: Task) => {
    updateTaskStatus(task.id, !task.completed);
  };

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    createTask(newTaskTitle);
    setNewTaskTitle("");
  };

  return (
    <section className="stack">
      <header className="card" style={{padding: "1rem"}}>
        <h1 style={{marginTop: 0, marginBottom: "0.5rem"}}>Task Dashboard</h1>
      </header>
      <form
        onSubmit={handleCreate}
        className="card"
        style={{padding: "1rem", display: "flex", gap: "1rem"}}
      >
        <input
          className="input"
          placeholder="What needs to be done?"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          disabled={creatingTask}
        />
        <button
          type="submit"
          className="button primary"
          disabled={creatingTask}
          style={{whiteSpace: "nowrap"}}
        >
          {creatingTask ? "Adding..." : "Add Task"}
        </button>
      </form>

      <StatusFilter value={filter} onChange={setFilter} />

      {loading ? (
        <section className="card" style={{padding: "1rem"}}>
          <p style={{margin: 0}}>Loading tasks...</p>
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
          <button type="button" className="button" onClick={fetchTasks}>
            Retry
          </button>
        </section>
      ) : null}

      {!loading && !error ? (
        <TaskList
          tasks={filteredTasks}
          updatingTaskId={updatingTaskId}
          onToggle={handleToggle}
          onDelete={deleteTask}
        />
      ) : null}
    </section>
  );
}
