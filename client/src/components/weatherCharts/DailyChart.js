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

const DailyChart = ({ data }) => {
  if (!data) return null;

  const chartData = {
    labels: data.timelines.daily.map((day) =>
      format(new Date(day.time), "EEE")
    ),
    datasets: [
      {
        label: "High",
        data: data.timelines.daily.map((day) => day.values.temperatureMax),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Low",
        data: data.timelines.daily.map((day) => day.values.temperatureMin),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
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
        text: "7-Day Forecast",
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

export default DailyChart;
