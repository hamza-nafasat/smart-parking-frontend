import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Reusable Line Chart Component
const MultiLineChart = ({
  data,
  lineConfigs,
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
  Yticks,
  width = "100%",
  height = 300,
  margin = { top: 20, right: 20, left: -15, bottom: 5 },
}) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={data} margin={margin}>
        {showGrid && <CartesianGrid strokeDasharray="2 2" stroke="#ccc" />}
        {showXAxis && (
          <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#333" }} />
        )}
        {showYAxis && (
          <YAxis ticks={Yticks} tick={{ fontSize: 10, fill: "#333" }} />
        )}
        <Tooltip formatter={(value) => `${value}`} />
        <Legend />

        {/* Render multiple curved lines */}
        {lineConfigs.map((lineConfig, index) => (
          <Line
            key={index}
            type="monotone" // Makes the lines curved
            dataKey={lineConfig.dataKey} // Data key passed from parent
            stroke={lineConfig.stroke} // Line color passed from parent
            strokeWidth={4} // Bold stroke width
            dot={false} // Remove dots
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MultiLineChart;
