import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "5px 10px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          fontWeight: "bold",
        }}
      >
        ${payload[0].value.toFixed(2)}
      </div>
    );
  }
  return null;
};

const CustomAreaChart = ({ data, color = "#18bc9c", showGradient, strokeWidth = 0, height = 270 }) => {
  const gradientId = `colorGradient-${color}`;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
        {showGradient && (
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.9} />
              <stop offset="95%" stopColor={color} stopOpacity={0.1} />
            </linearGradient>
          </defs>
        )}
        <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#333" }} />
        <YAxis tick={{ fontSize: 10, fill: "#333" }} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="uv"
          stroke={color}
          strokeWidth={strokeWidth}
          fillOpacity={1}
          fill={`url(#${gradientId})`}
          activeDot={{ r: 8, stroke: "#fff", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomAreaChart;
