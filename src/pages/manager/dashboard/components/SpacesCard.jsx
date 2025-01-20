import React from "react";
import BlankAreaChart from "../../../../components/charts/BlankAreaChart";
import LineBarChart from "../../../../components/charts/LineBarChart";

const SpacesCard = ({ data }) => {
  return (
    <div>
      <h6 className="text-xs md:text-sm text-[#414141] font-semibold">
        {data?.title}
      </h6>
      <div className="mt-4 w-[70%] mx-auto">
        <div className="flex items-center gap-3">
          <BlankAreaChart data={data?.data} areaColor={data?.color} />
          <h4
            className="text-xl md:text-[27px] font-bold"
            style={{ color: data?.color }}
          >
            {data?.value}%
          </h4>
        </div>
        <p className="text-xs" style={{ color: data?.color }}>
          {data?.description}
        </p>
      </div>
      <div className="mt-4">{/* <LineBarChart /> */}</div>
    </div>
  );
};

export default SpacesCard;
