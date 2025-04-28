import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register required components
Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function CookingGauge() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Create the gauge chart
    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [20, 20, 20, 20, 20], // Equal segments for the gauge
            backgroundColor: [
              "#2ecc71", // Green - Rare
              "#9bdb4d", // Light Green - Medium rare
              "#f1c40f", // Yellow - Medium
              "#e67e22", // Orange - Medium well
              "#e74c3c", // Red - Well
            ],
            circumference: 180,
            rotation: 270,
          },
        ],
        labels: ["Rare", "Medium rare", "Medium", "Medium well", "Well"],
      },
      options: {
        responsive: true,
        aspectRatio: 2,
        cutout: "70%",
        plugins: {
          tooltip: {
            enabled: false,
          },
          legend: {
            display: false,
          },
          datalabels: {
            formatter: (_, context) => {
              return context.chart.data.labels?.[context.dataIndex];
            },
            color: "#333",
            font: {
              weight: "bold",
              size: 12,
            },
            anchor: "end",
            align: "end",
            offset: 10,
          },
        },
        layout: {
          padding: {
            top: 30,
            bottom: 30,
            left: 20,
            right: 20,
          },
        },
      },
    });

    // Add needle to show current value
    const needleValue = 0.8; // Adjusted for better visibility of the arrow
    drawNeedle(ctx, needleValue, chartInstance.current);

    // Add text in the center
    addCenterText(ctx, chartInstance.current);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  // Function to draw the needle
  const drawNeedle = (ctx: CanvasRenderingContext2D, value: number, chart: Chart) => {
    const { width, height } = chart.canvas;
    const centerX = width / 2;
    const centerY = height - 10;
    const radius = (Math.min(width, height) / 2) * 0.8;

    // Calculate needle angle based on value (0 to 1)
    const angle = value * Math.PI - Math.PI / 2; // Adjusts for the rotation of the gauge

    const needleLength = radius * 0.8;
    const needleRadius = 10;
    const needleColor = "#000000";

    // Draw needle circle at the center
    ctx.beginPath();
    ctx.arc(centerX, centerY, needleRadius, 0, Math.PI * 2);
    ctx.fillStyle = needleColor;
    ctx.fill();

    // Draw the needle
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + Math.cos(angle) * needleLength, centerY + Math.sin(angle) * needleLength);
    ctx.lineWidth = 4;
    ctx.strokeStyle = needleColor;
    ctx.stroke();

    // Draw an arrow pointing to the current position
    const arrowSize = 60;
    const arrowDistance = radius * 0.5;
    const arrowX = centerX + Math.cos(angle) * (needleLength + arrowDistance);
    const arrowY = centerY + Math.sin(angle) * (needleLength + arrowDistance);

    // Draw arrow
    ctx.beginPath();
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(arrowX - arrowSize, arrowY - arrowSize);
    ctx.lineTo(arrowX + arrowSize, arrowY - arrowSize);
    ctx.closePath();
    ctx.fillStyle = "#e74c3c"; // Red arrow
    ctx.fill();

    // Add text next to the arrow
    ctx.font = "bold 14px Arial";
    ctx.fillStyle = "#e74c3c";
    ctx.textAlign = "center";
    ctx.fillText("YOU ARE HERE", arrowX, arrowY - arrowSize - 10);
  };

  // Function to add text in the center
  const addCenterText = (ctx: CanvasRenderingContext2D, chart: Chart) => {
    const { width, height } = chart.canvas;
    const centerX = width / 2;
    const centerY = height - 10;

    // Status text
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#999";
    ctx.font = "14px Arial";
    ctx.fillText("You are", centerX, centerY + 30);

    // Value text
    ctx.fillStyle = "#333";
    ctx.font = "bold 24px Arial";
    ctx.fillText("Super cooked", centerX, centerY + 60);

    // Metrics
    ctx.font = "12px Arial";
    ctx.fillStyle = "#666";

    // Draw meeting indicator
    ctx.beginPath();
    ctx.arc(centerX - 50, centerY + 90, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#ddd";
    ctx.fill();
    ctx.fillText("4 Meetings", centerX - 20, centerY + 90);

    // Draw hours indicator
    ctx.beginPath();
    ctx.arc(centerX + 30, centerY + 90, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#ddd";
    ctx.fill();
    ctx.fillText("3.5 / 9 hours", centerX + 70, centerY + 90);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-center mb-6">How cooked are you today? 🔥</h2>
        <div className="relative">
          <canvas ref={chartRef} height="300"></canvas>
        </div>
        <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-md text-sm">
          <p>Tip: Be sure to take a break after a long meeting to cooldown. We know its hard out there.</p>
        </div>
      </div>
    </div>
  );
}
