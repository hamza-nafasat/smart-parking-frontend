import React from "react";
import FloorDetail from "../../../components/shared/large/FloorDetail";
import {
  alertsData,
  floorDetailsList,
  spacesCardsData,
} from "../../admin/buildingInfo/utils/buildingData";
import {
  PrimaryWidgetCard,
  SecondaryWidgetCard,
} from "../../../components/shared/large/WidgetCard";
import Alerts from "../../../components/shared/large/Alerts";
import d3parking from "../../../assets/images/building/full-parking-d2.png";
import ParkingFloor from "../../../components/shared/large/ParkingFloor";
import { parkingFloorListData } from "./utils/managerData";
import { CiSearch } from "react-icons/ci";

const BuildingInfo = () => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-4 ">
        <div className="col-span-12 lg:col-span-9">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-4">
              <FloorDetail data={floorDetailsList} />
            </div>
            <div className="col-span-12 lg:col-span-8">
              <div className="flex flex-wrap gap-4">
                {spacesCardsData.map((card, i) => {
                  if (i < 3) {
                    return <PrimaryWidgetCard cardData={card} key={i} />;
                  } else if (i == 3) {
                    return <SecondaryWidgetCard cardData={card} key={i} />;
                  }
                })}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <img
              src={d3parking}
              alt="image"
              className="rounded-lg object-cover"
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-3">
          <Alerts alertsData={alertsData} height="h-[1050px]" />
        </div>
      </div>
      <div className="shadow-md rounded-lg bg-white border-[1px] p-4 mt-4">
        <div className="flex items-center justify-between gap-4 py-4 md:px-6">
          <h2 className="text-base font-bold text-[#414141]">
            Building Manager List
          </h2>
          <div className="flex items-center gap-2 bg-[#F9FBFF] border border-[#e7e7e7] rounded-[10px] py-2 px-4">
            <CiSearch fontSize={20} color="#7E7E7E" />
            <input
              type="text"
              placeholder="Search"
              className="w-full text-xs md:text-base bg-transparent border-none focus:outline-none text-[#7E7E7E]"
            />
          </div>
        </div>
        <div className="border-t border-[#E7E7E7]"></div>
        <ParkingFloor
          listData={parkingFloorListData}
          linkTo={(id) => `/manager/floor-view/${id}`}
        />
      </div>
    </div>
  );
};

export default BuildingInfo;
