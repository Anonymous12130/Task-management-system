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

function PersonalAnalytics() {
 const data = {
  labels: [
    "Goals",
    "Habits",
    "Study",
    "Notes",
  ],
  datasets: [
    {
      data: [40, 20, 25, 15],
      backgroundColor: [
        "#6366F1",
        "#22C55E",
        "#F59E0B",
        "#EF4444",
      ],
      borderWidth: 2,
    },
  ],
};

  return (
    <div className="container p-4">

      <h1>
        📊 Analytics Dashboard
      </h1>

      <div
        className="card p-4 shadow"
      >
        <Pie data={data} />
      </div>

    </div>
  );
}

export default PersonalAnalytics;