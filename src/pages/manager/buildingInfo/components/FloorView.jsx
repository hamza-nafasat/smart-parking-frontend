import { useEffect, useState } from "react";
import Alerts from "../../../../components/shared/large/Alerts";
import FloorDetail from "../../../../components/shared/large/FloorDetail";
import { PrimaryWidgetCard, SecondaryWidgetCard } from "../../../../components/shared/large/WidgetCard";
import { useGetSingleFloorQuery } from "../../../../redux/apis/floorApis";
import { alertsData, spacesCardsData } from "../../../admin/buildingInfo/utils/buildingData";
import { Link, useParams } from "react-router-dom";
import EditIcon from "../../../../assets/svgs/parkingStepper/EditIcon";
import DeleteIcon from "../../../../assets/svgs/parkingStepper/DeleteIcon";

const FloorView = () => {
  const [floorData, setFloorData] = useState(null);
  const floorId = useParams().id;
  const { data } = useGetSingleFloorQuery(floorId);

  useEffect(() => {
    if (data) setFloorData(data?.data);
  }, [data]);
  return (
    <div>
      <section>
        <section>
          <section className="m-2 flex justify-end">
            <div className="flex items-center gap-4">
              <Link to={`/manager/edit-floor-info/${floorId}`}>
                <EditIcon />
              </Link>
              <button onClick={() => console.log("delete")}>
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
              <FloorDetail data={floorData} />
            </div>
            <div className="col-span-12 lg:col-span-8">
              <div className="flex flex-wrap gap-4">
                {spacesCardsData.map((card, i) => {
                  if (i < 3) {
                    return <PrimaryWidgetCard key={i} cardData={card} />;
                  } else if (i == 3) {
                    return <SecondaryWidgetCard key={i} cardData={card} />;
                  }
                })}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <img src={floorData?.twoDImage?.url} alt="image" className="rounded-lg object-cover" />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-3">
          <Alerts alertsData={alertsData} height="h-[1050px]" />
        </div>
      </div>
      <div className="shadow-md rounded-lg bg-white border-[1px] p-4 mt-4">
        <h4 className="font-[600] mb-4">Ramps View</h4>
        <div className="">
          <img src={floorData?.twoDImage?.url} alt="image" className=" rounded-lg object-cover" />
        </div>
      </div>
    </div>
  );
};

export default FloorView;
