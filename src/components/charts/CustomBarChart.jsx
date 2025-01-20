import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Cell,
  Tooltip,
  YAxis,
  XAxis,
  CartesianGrid,
} from "recharts";

const CustomBarChart = ({
  data,
  gradients, // Passing gradient info as a prop
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
  Yticks,
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart width={500} height={300} data={data}>
        {/* Dynamic gradient definitions */}
        <defs>
          {data.map((gradient, index) => (
            <linearGradient
              id={`gradient${index}`}
              key={index}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={gradient.startColor} />
              <stop offset="100%" stopColor={gradient.endColor} />
            </linearGradient>
          ))}
        </defs>

        {showGrid && <CartesianGrid strokeDasharray="3 3" />}

        {showXAxis && (
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: "#333" }}
            axisLine={false}
            tickLine={false}
          />
        )}

        {showYAxis && (
          <YAxis
            ticks={Yticks}
            tick={{ fontSize: 10, fill: "#333" }}
            axisLine={false}
            tickLine={false}
          />
        )}

        {/* Tooltip without hover effects */}
        <Tooltip cursor={{ fill: "transparent" }} />

        {/* Render bars with gradient fill */}
        <Bar dataKey="uv" barSize={50} radius={5} isAnimationActive={false}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={`url(#gradient${index})`} // Dynamically applying gradient
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
