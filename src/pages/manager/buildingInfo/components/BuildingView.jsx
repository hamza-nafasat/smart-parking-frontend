/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useParams, Link, useNavigate } from "react-router-dom";
import Alerts from "../../../../components/shared/large/Alerts";
import ParkingFloor from "../../../../components/shared/large/ParkingFloor";
import { PrimaryWidgetCard, SecondaryWidgetCard } from "../../../../components/shared/large/WidgetCard";
import { useDeleteSingleBuildingMutation, useGetSingleBuildingQuery } from "../../../../redux/apis/buildingApis";
import { useGetAllFloorsQuery } from "../../../../redux/apis/floorApis";
import { alertsData, spacesCardsData } from "../../../admin/buildingInfo/utils/buildingData";
import EditIcon from "../../../../assets/svgs/parkingStepper/EditIcon";
import DeleteIcon from "../../../../assets/svgs/parkingStepper/DeleteIcon";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";

const BuildingView = () => {
  const navigate = useNavigate();
  const buildingId = useParams().id;
  const [buildingData, setBuildingData] = useState(null);
  const [deleteBuilding] = useDeleteSingleBuildingMutation();
  const { data } = useGetSingleBuildingQuery(buildingId);
  const { data: floorsData } = useGetAllFloorsQuery(buildingId);

  // building delete handler
  const buildingDeleteHandler = (id) => {
    confirmAlert({
      title: "Delete Building",
      message: "Are you sure, you want to delete this building?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            if (!id) return toast.error("Please Provide Building Id");
            try {
              const res = await deleteBuilding(id).unwrap();
              console.log("building delete response", res);
              return navigate("/manager/building-info");
            } catch (error) {
              console.log("error in delete building", error);
              toast.error(error?.data?.message || "Error while deleting building");
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  useEffect(() => {
    if (data) setBuildingData(data?.data);
  }, [data]);

  return (
    <div className="">
      <section>
        <section className="m-2 flex justify-end">
          <div className="flex items-center gap-4">
            <Link to={`/manager/edit-building-info/${buildingId}`}>
              <EditIcon />
            </Link>
            <button onClick={() => buildingDeleteHandler(buildingId)}>
              <DeleteIcon />
            </button>
          </div>
        </section>
      </section>
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
        <ParkingFloor data={floorsData?.data} linkTo={(id) => `/manager/floor-view/${buildingId}/${id}`} />
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
