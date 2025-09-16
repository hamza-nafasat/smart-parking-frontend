import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa6';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GreenEdit } from '../../../../assets/svgs/Icon';
import useFetchAndMakeSensorSlice from '../../../../components/hooks/useFetchAndMakeSensorSlice';
import Alerts from '../../../../components/shared/large/Alerts';
import FloorDetail from '../../../../components/shared/large/FloorDetail';
import { PrimaryWidgetCard, SecondaryWidgetCard } from '../../../../components/shared/large/WidgetCard';
import { useDeleteSingleFloorMutation, useGetSingleBuildingFloorQuery } from '../../../../redux/apis/floorApis';
import { useGetAllSlotsQuery } from '../../../../redux/apis/slotApis';
import { alertsData, spacesCardsData } from '../../../admin/buildingInfo/utils/buildingData';
import ShowCanvasData from '../../addParkingSpace/components/ShowCanvasData';
import { useGetFloorAnalyticsQuery, useGetFloorOverallAnalyticsQuery } from '../../../../redux/apis/floorApis';
import { skipToken } from '@reduxjs/toolkit/query';

const FloorView = () => {
  const params = useParams();
  const floorId = params.id;
  const buildingId = params.buildingId;
  const navigate = useNavigate();
  const [deleteFloor] = useDeleteSingleFloorMutation();
  const [floorData, setFloorData] = useState(null);
  const { data } = useGetSingleBuildingFloorQuery(floorId);
  const [polygons, setPolygons] = useState([]);
  const { data: slots } = useGetAllSlotsQuery(floorId);
  const { refetchHook } = useFetchAndMakeSensorSlice();

  const [spacesCardsData, setSpacesCardsData] = useState(null);
  const [filterState, setFilterState] = useState({
    cardType: null,
    filter: 'daily',
  });
  const { data: floorAnalytics } = useGetFloorOverallAnalyticsQuery({ floorId });

  const { data: floorAnalyticsPerFilter } = useGetFloorAnalyticsQuery(
    filterState.cardType && filterState.filter
      ? { floorId, cardType: filterState.cardType, filter: filterState.filter }
      : skipToken
  );

  useEffect(() => {
    if (floorAnalytics) {
      setSpacesCardsData([
        ...floorAnalytics?.data,
        [
          {
            type: 'installed',
            count: 34,
          },
          { type: 'active', count: 34 },

          { type: 'offline', count: 55 },
        ],
      ]);
    }
  }, [floorAnalytics]);

  useEffect(() => {
    if (floorAnalyticsPerFilter) {
      setSpacesCardsData((prev) =>
        prev.map((card) =>
          card?.cardType === floorAnalyticsPerFilter?.data?.cardType ? floorAnalyticsPerFilter?.data : card
        )
      );
    }
  }, [floorAnalyticsPerFilter]);

  const handleFilterChange = (cardType, filter) => {
    setFilterState({ cardType, filter });
  };

  const floorDeleteHandler = (id) => {
    confirmAlert({
      title: 'Delete Floor',
      message: 'Are you sure, you want to delete this floor?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            if (!id) return toast.error('Please Provide Floor Id');
            try {
              const res = await deleteFloor(id).unwrap();
              if (res?.success) {
                toast.success(res?.message || 'Floor Deleted Successfully');
                await refetchHook();
              }
              return navigate(`/manager/building-view/${buildingId}`);
            } catch (error) {
              console.log('error in delete floor', error);
              toast.error(error?.data?.message || 'Error while deleting floor');
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };

  useEffect(() => {
    if (slots?.data)
      setPolygons(
        slots?.data?.map((slot) => ({
          id: slot?.id,
          points: slot?.points,
          color: slot?.color,
          fillColor: slot?.fillColor,
          _id: slot?._id,
        }))
      );
  }, [floorData, slots?.data]);

  useEffect(() => {
    if (data) setFloorData(data?.data);
  }, [data]);
  return (
    <div>
      <section className="m-2 flex justify-end">
        <div className="flex items-center gap-4">
          <Link
            className="flex items-center justify-center"
            title="Edit Floor "
            to={`/manager/edit-floor-info/${buildingId}/${floorId}`}
          >
            <GreenEdit width="20" height="20" />
          </Link>
          <button
            className="text-red-400 flex items-center justify-center"
            title="Delete Floor"
            onClick={() => floorDeleteHandler(floorId)}
          >
            <FaTrash size={20} />
          </button>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-4 ">
        <div className="col-span-12 lg:col-span-9">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-4">
              <FloorDetail data={floorData} />
            </div>
            <div className="col-span-12 lg:col-span-8">
              <div className="flex flex-wrap gap-4">
                {spacesCardsData?.map((card, i) => {
                  if (i < 3) {
                    return (
                      <PrimaryWidgetCard
                        key={card?.cardType || i}
                        cardData={card}
                        buildingId={floorId}
                        cardType={card?.cardType}
                        onFilterChange={handleFilterChange}
                      />
                    );
                  } else if (i == 3) {
                    return <SecondaryWidgetCard key={card?.cardType || i} cardData={card} />;
                  }
                })}
              </div>
            </div>
          </div>
          <div className="mt-4">
            {/* <img src={floorData?.twoDImage?.url} alt="image" className="rounded-lg object-cover" /> */}
            <ShowCanvasData
              polygons={polygons?.length ? polygons : floorData?.polygonData ? floorData?.polygonData : []}
              // polygons={polygons}
              image={floorData?.twoDImage?.url}
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
          <ShowCanvasData
            polygons={polygons?.length ? polygons : floorData?.polygonData ? floorData?.polygonData : []}
            // polygons={polygons}
            image={floorData?.twoDImage?.url}
          />
        </div>
      </div>
    </div>
  );
};

export default FloorView;
