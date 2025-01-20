import React, { useState } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
import { HappyFace } from "../../assets/svgs/Icon";

const data = [
  { name: "Mon", views: 40 },
  { name: "Tue", views: 30 },
  { name: "Wed", views: 50 },
  { name: "Thu", views: 60 },
  { name: "Fri", views: 40 },
  { name: "Sat", views: 70 },
  { name: "Sun", views: 50 },
];

const CustomizedDot = ({ cx, cy, fill }) => {
  return (
    <circle cx={cx} cy={cy} r={5} fill="white" stroke={fill} strokeWidth={2} />
  );
};

const CustomTooltip = ({ active, payload, label, fill }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "white",
          border: "1px solid #ddd",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
          color: "#333",
        }}
      >
        <div className="flex gap-2 items-start">
          <HappyFace fill={fill} />
          <div>
            <p className="label" style={{ margin: 0, fontWeight: "bold" }}>
              {`Views: ${payload[0].value}`}
            </p>
            <p style={{ margin: 0 }} className="text-sm">
              {label}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// Custom Bar shape with hover effect
const CustomBar = (props) => {
  const { fill, x, y, width, height, isHovered } = props;
  return (
    <Rectangle
      x={x}
      y={y}
      width={width}
      height={height}
      fill={isHovered ? fill : `${fill}${90}`}
      radius={[5, 5, 5, 5]}
    />
  );
};

const LineBarChart = ({ fill }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <ComposedChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          bottom: 0,
          left: 0,
        }}
        barCategoryGap="20%"
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" tick={false} axisLine={false} />
        <YAxis tick={[10, 50, 100]} />
        <Tooltip content={<CustomTooltip fill={fill} />} />

        <Bar
          dataKey="views"
          barSize={20}
          fill={fill}
          shape={(props) => (
            <CustomBar
              {...props}
              fill={fill}
              isHovered={hoveredIndex === props.index}
            />
          )}
          radius={[5, 5, 5, 5]}
          onMouseEnter={(_, index) => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        />

        <Line
          type="linear"
          dataKey="views"
          stroke={fill}
          dot={<CustomizedDot fill={fill} />}
          strokeWidth={3}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default LineBarChart;
