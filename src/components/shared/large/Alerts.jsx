import React from "react";
import { AlertSideIcon } from "../../../assets/svgs/Icon";

const Alerts = ({ alertsData, height }) => {
  return (
    <div
      className={`border border-[#6F6F6F1F] rounded-lg shadow-md bg-white px-6 py-4 overflow-y-scroll custom-scroll ${
        height ? height : "h-[555px]"
      }`}
    >
      <h6 className="text-base md:text-xl font-bold text-[#292D32]">Alerts</h6>
      {alertsData?.map((item, index) => (
        <div key={index} className="mt-4 border-b border-[#5C5B5B24]">
          <div className="flex items-center gap-1">
            <AlertSideIcon alertType={item?.alertType} />
            <p className={`text-xs font-medium text-[#5C5B5B]`}>
              <span
                className={`font-bold capitalize ${
                  item?.alertType === "alert"
                    ? "text-[#FF8C00]"
                    : item?.alertType === "notification"
                    ? "text-[#32CD32]"
                    : "text-[#FF0000]"
                }`}
              >
                {item?.alertType}:
              </span>{" "}
              {item?.alert}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Alerts;
