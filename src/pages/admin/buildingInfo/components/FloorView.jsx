import React from 'react';
import FloorDetail from '../../../../components/shared/large/FloorDetail';
import SpacesCards from '../../../../components/shared/large/SpacesCards';
import { alertsData, floorDetailsList, spacesCardsData } from '../utils/buildingData';
import Alerts from '../../../../components/shared/large/Alerts';
import d3parking from '../../../../assets/images/building/3dparking.png';
import d2parking from '../../../../assets/images/building/2dparking.png';
import { PrimaryWidgetCard, SecondaryWidgetCard } from '../../../../components/shared/large/WidgetCard';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetBuildingFloorForAdminQuery,
  useGetFloorAnalyticsForAdminQuery,
  useGetFloorOverallAnalyticsForAdminQuery,
} from '../../../../redux/apis/floorApis';
import { useEffect } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useState } from 'react';

const FloorView = () => {
  const navigate = useNavigate();
  const floorId = useParams().id;
  const [floorDetailsList, setFloorDetailsList] = React.useState(null);
  const { data } = useGetBuildingFloorForAdminQuery(floorId);
  const [spacesCardsData, setSpacesCardsData] = useState(null);
  const [filterState, setFilterState] = useState({
    cardType: null,
    filter: 'daily',
  });
  const { data: floorAnalytics } = useGetFloorOverallAnalyticsForAdminQuery({ floorId });

  const { data: floorAnalyticsPerFilter } = useGetFloorAnalyticsForAdminQuery(
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

  useEffect(() => {
    if (data) {
      setFloorDetailsList(data?.data);
    }
  }, [data]);
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
            <img src={d3parking} alt="image" className="rounded-lg object-cover" />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-3">
          <Alerts alertsData={alertsData} height="h-[1050px]" />
        </div>
      </div>
      <div className="shadow-md rounded-lg bg-white border-[1px] p-4 mt-4">
        <h4 className="font-[600] mb-4">Ramps View</h4>
        <div className="">
          <img src={d2parking} alt="image" className=" rounded-lg object-cover" />
        </div>
      </div>
    </div>
  );
};

export default FloorView;
