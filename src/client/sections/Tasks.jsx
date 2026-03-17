import "../design/tasks.css";

export default function Tasks({ tasks }) {
  const sorted = [...tasks].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
  );

  return (
    <section id="tasks">
      <div className="section-inner">
        <p className="section-label">Plan</p>
        <h2 className="section-title">
          Your <em>To-Do List</em>
        </h2>
        <div className="divider" />

        {sorted.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <p>No tasks yet — stay productive 🌸</p>
          </div>
        ) : (
          <div className="tasks-grid">
            {sorted.slice(0, 6).map((task) => (
              <div key={task._id} className="task-card">
                <div className="task-header">
                  <span className="task-status">{task.status || "Todo"}</span>
                </div>

                <h3 className="task-title">{task.title}</h3>

                {task.description && (
                  <p className="task-desc">
                    {task.description.length > 80
                      ? task.description.slice(0, 80) + "..."
                      : task.description}
                  </p>
                )}

                {task.dueDate && (
                  <p className="task-date">
                    Due Date: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
