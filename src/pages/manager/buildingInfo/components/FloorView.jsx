import React, { useState } from "react";
import FloorDetail from "../../../../components/shared/large/FloorDetail";
import SpacesCards from "../../../../components/shared/large/SpacesCards";
import {
  alertsData,
  floorDetailsList,
  spacesCardsData,
} from "../../../admin/buildingInfo/utils/buildingData";
import Alerts from "../../../../components/shared/large/Alerts";
import d3parking from "../../../../assets/images/building/3dparking.png";
import d2parking from "../../../../assets/images/building/2dparking.png";
import {
  PrimaryWidgetCard,
  SecondaryWidgetCard,
} from "../../../../components/shared/large/WidgetCard";
import { Link, useParams } from "react-router-dom";
import EditIcon from "../../../../assets/svgs/parkingStepper/EditIcon";
import DeleteIcon from "../../../../assets/svgs/parkingStepper/DeleteIcon";

const FloorView = () => {



  const [deleteModal, setDeleteModal] = useState(false);
  const { id } = useParams();
  console.log("id", id)
  const handleOpenDeleteModal = () => {
    setDeleteModal(true);
  };



  return (
    <div className="bg-red-500">
      <section>
        <section>
          <section className="m-2 flex justify-end">
            <div className="flex items-center gap-4">
              <Link to={`/manager/edit-floor-info/${id}`}>
                <EditIcon />
              </Link>
              <button onClick={handleOpenDeleteModal}>
                <DeleteIcon />
              </button>
            </div>
          </section>
        </section>
      </section>
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
                    return <PrimaryWidgetCard cardData={card} />;
                  } else if (i == 3) {
                    return <SecondaryWidgetCard cardData={card} />;
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
        <h4 className="font-[600] mb-4">Ramps View</h4>
        <div className="">
          <img
            src={d2parking}
            alt="image"
            className=" rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default FloorView;
