import React from "react";
import BuildingData from "./BuildingData";
import SpacesCards from "../../../../components/shared/large/SpacesCards";
import {
  alertsData,
  parkingFloorListData,
  spacesCardsData,
} from "../utils/buildingData";
import RevenueOverview from "./RevenueOverview";
import Alerts from "../../../../components/shared/large/Alerts";
import DataTable from "react-data-table-component";
import {
  parkingBookingData,
  parkingSummaryColumns,
} from "../../parkingSummary/components/ParkingSummaryColumns";
import { tableStyles } from "../../../../components/shared/small/dataTableStyles";
import { useNavigate } from "react-router-dom";
import ParkingFloor from "../../../../components/shared/large/ParkingFloor";
import { CiSearch } from "react-icons/ci";
import GlobalTable from "../../../../components/shared/large/GlobalTable";
import {
  PrimaryWidgetCard,
  SecondaryWidgetCard,
} from "../../../../components/shared/large/WidgetCard";

const BuildingView = () => {
  const navigate = useNavigate();
  console.log("data", spacesCardsData);
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-3 flex">
        <BuildingData />
      </div>
      <div className="col-span-12 lg:col-span-6">
        {/* <SpacesCards cardData={spacesCardsData} /> */}
        <div className="flex flex-wrap gap-4">
          {spacesCardsData.map((card, i) => {
            if (i < 3) {
              return <PrimaryWidgetCard cardData={card} />;
            } else if (i == 3) {
              return <SecondaryWidgetCard cardData={card} />;
            }
          })}
        </div>
        <RevenueOverview />
      </div>
      <div className="col-span-12 lg:col-span-3">
        <Alerts alertsData={alertsData} />
      </div>

      <div className="col-span-12 border border-[#6F6F6F1F] rounded-lg shadow-md bg-white p-2">
        <GlobalTable
          heading="Booking Summary"
          columns={parkingSummaryColumns(navigate)}
          data={parkingBookingData}
        />
      </div>
      <div className="col-span-12">
        <div className="md:border md:border-[#E7E7E7] md:shadow-md md:rounded-[16px]">
          <div className="flex items-center justify-between gap-4 py-4 md:px-6">
            <h2 className="text-base font-bold text-[#414141]">
              Parking Floors
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
          <div className="pb-4 md:px-6">
            <ParkingFloor
              listData={parkingFloorListData}
              linkTo={(id) => `/admin/floor-view/${id}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingView;
