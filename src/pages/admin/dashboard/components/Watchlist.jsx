import { GoArrowUp } from "react-icons/go";
import BlankAreaChart from "../../../../components/charts/BlankAreaChart";

const Watchlist = ({ name, id, arrow, blankChartData, areaColor }) => {
  return (
    <div className="flex gap-4 items-center justify-between border-b-[2px] my-1">
      <div className="min-w-[80px]">
        <h3 className="font-[700] text-sm">{name}</h3>
        <h6 className="text-sm">{id}</h6>
      </div>

      <BlankAreaChart
        data={blankChartData}
        areaColor={areaColor}
        height={400}
      />

      <h2 className="flex items-center gap-1 text-lg font-[700]">
        15%{" "}
        <GoArrowUp
          className={`${
            arrow === "up" ? "text-primary" : "rotate-180 text-red-500"
          }`}
        />
      </h2>
    </div>
  );
};

export default Watchlist;
