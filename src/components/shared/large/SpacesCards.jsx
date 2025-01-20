/* eslint-disable react/prop-types */
import BlankAreaChart from "../../charts/BlankAreaChart";
import { ParkingSensorIcon } from "../../../assets/svgs/Icon";

const SpacesCards = ({ cardData }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {cardData?.map((data, i) => (
        <div
          key={i}
          className="border border-[#6F6F6F1F] rounded-lg shadow-md bg-white px-6 py-4 w-[300px] grow"
        >
          <div className="flex items-center justify-between gap-4">
            <h6 className="text-sm font-semibold text-[#292D32]">
              {data?.title}
            </h6>
            <select className="border-[0.4px] border-[#5C5B5B80] rounded-[4px] text-[#5C5B5B80] text-[11px] outline-none">
              <option value="daily" className="text-[11px] text-[#5C5B5B80]">
                Daily
              </option>
              <option value="monthly" className="text-[11px] text-[#5C5B5B80]">
                Monthly
              </option>
            </select>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10">{data?.icon}</div>
            <div>
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
          </div>
        </div>
      ))}
      <div className="border border-[#6F6F6F1F] rounded-lg shadow-md bg-white px-6 py-4 w-[300px] grow">
        <div className="flex items-center justify-between gap-4">
          <h6 className="text-sm font-semibold text-[#292D32]">
            Sensor Status
          </h6>
          <select className="border-[0.4px] border-[#5C5B5B80] rounded-[4px] text-[#5C5B5B80] text-[11px] outline-none">
            <option value="daily" className="text-[11px] text-[#5C5B5B80]">
              Daily
            </option>
            <option value="monthly" className="text-[11px] text-[#5C5B5B80]">
              Monthly
            </option>
          </select>
        </div>
        <div className="flex items-center justify-around gap-5 mt-4">
          <div>
            <List data={{ title: "Installed", value: 2323 }} />
            <List data={{ title: "Active", value: 632 }} />
            <List data={{ title: "Offline", value: 432 }} />
          </div>
          <div className="flex flex-col items-center gap-1">
            <ParkingSensorIcon />
            <p className="text-xs font-medium text-[#414141]">Parking Sensor</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpacesCards;

const List = ({ data }) => {
  return (
    <h6 className="text-[10px] text-[#11111199]">
      {data?.title}:{" "}
      <span className="font-medium text-[#414141]">{data?.value}</span>
    </h6>
  );
};
