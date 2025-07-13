import React from "react";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HourlyChart = ({ data }) => {
  if (!data) return null;

  const next24Hours = data.timelines.hourly.slice(0, 24);

  const chartData = {
    labels: next24Hours.map((hour) => format(new Date(hour.time), "HH:mm")),
    datasets: [
      {
        label: "Temperature",
        data: next24Hours.map((hour) => hour.values.temperature),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#fff",
        },
      },
      title: {
        display: true,
        text: "24-Hour Forecast",
        color: "#fff",
      },
    },
    scales: {
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#fff",
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#fff",
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  return (
    <div
      style={{
        height: "300px",
        padding: "20px",
        background: "rgba(0, 0, 0, 0.3)",
        borderRadius: "20px",
      }}
    >
      <Line options={options} data={chartData} />
    </div>
  );
};

export default HourlyChart;
