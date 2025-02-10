/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useParams } from "react-router-dom";
import Alerts from "../../../../components/shared/large/Alerts";
import ParkingFloor from "../../../../components/shared/large/ParkingFloor";
import { PrimaryWidgetCard, SecondaryWidgetCard } from "../../../../components/shared/large/WidgetCard";
import { useGetSingleBuildingQuery } from "../../../../redux/apis/buildingApis";
import { alertsData, spacesCardsData } from "../../../admin/buildingInfo/utils/buildingData";
import { parkingFloorListData } from "../utils/managerData";
import { useGetAllFloorsQuery } from "../../../../redux/apis/floorApis";

const BuildingView = () => {
  const [buildingData, setBuildingData] = useState(null);
  const buildingId = useParams().id;
  const { data } = useGetSingleBuildingQuery(buildingId);
  const { data: floorsData } = useGetAllFloorsQuery(buildingId);

  useEffect(() => {
    if (data) setBuildingData(data?.building);
  }, [data]);

  return (
    <div>
      <div className="grid grid-cols-12 gap-4 ">
        <div className="col-span-12 lg:col-span-9">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-4">
              <BuildingDetails data={buildingData} />
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
            <img src={buildingData?.twoDImage?.url} alt="image" className="rounded-lg object-cover" />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-3">
          <Alerts alertsData={alertsData} height="h-[1050px]" />
        </div>
      </div>
      <div className="shadow-md rounded-lg bg-white border-[1px] p-4 mt-4">
        <div className="flex items-center justify-between gap-4 py-4 md:px-6">
          <h2 className="text-base font-bold text-[#414141]">Parking Floors</h2>
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
        <ParkingFloor data={floorsData?.data} listData={parkingFloorListData} linkTo={(id) => `/manager/floor-view/${id}`} />
      </div>
    </div>
  );
};

export default BuildingView;

const BuildingDetails = ({ data }) => {
  return (
    <div className="bg-white p-4 border-[1px] shadow-md rounded-lg h-full">
      <h2 className="mb-2">Building Details</h2>
      <div className="flex gap-5 items-center flex-wrap">
        <img src={data?.twoDImage?.url} alt="image" className="size-[150] rounded-lg object-cover" />
        <div className="flex flex-col gap-2">
          <div>
            <div className="flex gap-1 items-center">
              <p className="text-sm font-[700] text-[#20312EB2]">Building Name</p>
            </div>
            <p className="text-sm font-[700] text-[#414141]">{data?.name}</p>
          </div>
          <div>
            <div className="flex gap-1 items-center">
              <p className="text-sm font-[700] text-[#20312EB2]">Building Type</p>
            </div>
            <p className="text-sm font-[700] text-[#414141]">{data?.type}</p>
          </div>
          <div>
            <div className="flex gap-1 items-center">
              <p className="text-sm font-[700] text-[#20312EB2]">Building Address</p>
            </div>
            <p className="text-sm font-[700] text-[#414141]">{data?.address}</p>
          </div>
          <div>
            <div className="flex gap-1 items-center">
              <p className="text-sm font-[700] text-[#20312EB2]">Building Area</p>
            </div>
            <p className="text-sm font-[700] text-[#414141]">{data?.area}</p>
          </div>
          <div>
            <div className="flex gap-1 items-center">
              <p className="text-sm font-[700] text-[#20312EB2]">Building Description</p>
            </div>
            <p className="text-sm font-[700] text-[#414141]">{data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
