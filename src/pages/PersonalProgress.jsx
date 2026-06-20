import { useState } from "react";

function PersonalProgress() {
  const [goals] = useState([
    {
      title: "Task Management System",
      progress: 95,
    },
    {
      title: "React Learning",
      progress: 70,
    },
  ]);

  return (
    <div className="container p-4">
      <h1>📈 Personal Progress</h1>

      {goals.map((goal, index) => (
        <div
          key={index}
          className="card p-3 mb-3"
        >
          <h4>{goal.title}</h4>

          <div className="progress">
            <div
              className="progress-bar"
              style={{
                width:
                  `${goal.progress}%`,
              }}
            >
              {goal.progress}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PersonalProgress;