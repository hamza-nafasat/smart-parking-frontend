import React from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const BlankAreaChart = ({ data, areaColor = "#8884d8", width = "100%" }) => {
  const formattedData = data?.map((uv, index) => ({
    uv,
    name: `Point ${index + 1}`,
  }));

  return (
    <ResponsiveContainer width={width} height={60}>
      <AreaChart
        data={formattedData}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient
            id={`colorUv_${areaColor}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor={areaColor} stopOpacity={0.8} />{" "}
            <stop offset="100%" stopColor={areaColor} stopOpacity={0} />{" "}
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="uv"
          stroke={areaColor}
          fill={`url(#colorUv_${areaColor})`}
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default BlankAreaChart;
