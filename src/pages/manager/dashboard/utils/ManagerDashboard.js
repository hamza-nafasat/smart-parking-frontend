const multiLineData = [
  { name: "Monday", space1: 400, space2: 400, space3: 400, space4: 100 },
  { name: "Tuesday", space1: 500, space2: 398, space3: 210, space4: 600 },
  { name: "Wednesday", space1: 100, space2: 800, space3: 690, space4: 300 },
  { name: "Thursday", space1: 700, space2: 608, space3: 200, space4: 500 },
  { name: "Friday", space1: 250, space2: 200, space3: 681, space4: 400 },
  { name: "Saturday", space1: 400, space2: 50, space3: 381, space4: 200 },

  { name: "Sunday", space1: 100, space2: 250, space3: 281, space4: 100 },
];
const lineConfigs = [
  { dataKey: "space1", stroke: "#FAA80E" },
  { dataKey: "space2", stroke: "#18BC9C" },
  { dataKey: "space3", stroke: "#1B7AA6" },
  { dataKey: "space4", stroke: "#18BC9C" },
];

const parkingSpaceBarChartData = [
  {
    name: "Page A",
    uv: 700,
    color: "#8884d8",
    startColor: "#0D5546",
    endColor: "#1CBB9B",
  },
  {
    name: "Page B",
    uv: 700,
    color: "#82ca9d",
    startColor: "#0D5546",
    endColor: "#1CBB9B",
  },
  {
    name: "Page C",
    uv: 600,
    color: "#ffc658",
    startColor: "#0D5546",
    endColor: "#1CBB9B",
  },
  {
    name: "Page D",
    uv: 500,
    color: "#d84f91",
    startColor: "#0D5546",
    endColor: "#1CBB9B",
  },
  {
    name: "Page E",
    uv: 800,
    color: "#f67280",
    startColor: "#0D5546",
    endColor: "#1CBB9B",
  },
];

export { multiLineData, lineConfigs, parkingSpaceBarChartData };
