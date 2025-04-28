"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const FocusHours = () => {
  const [bufferTime, setBufferTime] = useState(15);
  const [activeTab, setActiveTab] = useState("Today");
  const [focustime, setFocustime] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        "http://localhost:3003/api/v1/googlecalender/focushours",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setFocustime(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Chart data
  const chartData = {
    labels: [
      "9 am",
      "10 am",
      "11 am",
      "12 pm",
      "1 pm",
      "2 pm",
      "3 pm",
      "4 pm",
      "5 pm",
      "6 pm",
    ],
    datasets: [
      {
        label: "Focus Hours",
        // Map data from API response
        data: focustime.length
          ? focustime.map((item: any) => parseFloat(item.focustime) || 0) // Fallback to 0 if no data
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Fallback if API data isn't available
        backgroundColor: (context: any) => {
          const value = context.dataset.data[context.dataIndex];
          if (value === 0) return "transparent";
          if (value < 1) return "#ff6b6b"; // Tough (<1 hr) - Red
          if (value < 2.5) return "#ffd166"; // Average (>1.5 hr) - Yellow
          return "#6bce66"; // Peak (>2.5 hr) - Green
        },
        borderColor: "transparent",
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 20,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 6,
        ticks: {
          stepSize: 1,
          font: {
            size: 12,
          },
        },
        grid: {
          drawBorder: false,
        },
        title: {
          display: true,
          text: "Focus Hours",
          font: {
            size: 12,
          },
          color: "#888",
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y;
            let label = "";

            if (value < 1) label = "Tough: ";
            else if (value < 2.5) label = "Average: ";
            else label = "Peak: ";

            return `${label}${value} hours`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Focus hours 😎</h2>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">I need atleast</span>
          <input
            type="number"
            value={bufferTime}
            onChange={(e) => setBufferTime(Number.parseInt(e.target.value))}
            className="w-12 h-8 border border-gray-300 rounded text-center text-sm"
          />
          <span className="text-sm text-gray-600">mins of buffer time</span>
        </div>

        <div className="flex space-x-2">
          {["Today", "This week", "This month"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1 text-sm rounded-md ${
                activeTab === tab
                  ? "bg-gray-200 text-gray-800"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 mb-6">
        <Bar data={chartData} options={options as any} />
      </div>

      <div className="flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-[#6bce66] rounded-full mr-2"></span>
          <span>Peak (&gt;2.5 hr)</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-[#ffd166] rounded-full mr-2"></span>
          <span>Average (&gt;1.5 hr)</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-[#ff6b6b] rounded-full mr-2"></span>
          <span>Tough (&lt;1 hr)</span>
        </div>
      </div>
    </div>
  );
};
