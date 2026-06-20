import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function TaskChart({
  completed,
  pending,
}) {
  const data = {
    labels: [
      "Completed",
      "Pending",
    ],
    datasets: [
      {
        data: [
          completed,
          pending,
        ],
      },
    ],
  };

  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        margin: "auto",
      }}
    >
      <Pie data={data} />
    </div>
  );
}

export default TaskChart;