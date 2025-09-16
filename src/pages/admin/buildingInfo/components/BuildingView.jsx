import { CiSearch } from 'react-icons/ci';
import { useNavigate, useParams } from 'react-router-dom';
import Alerts from '../../../../components/shared/large/Alerts';
import GlobalTable from '../../../../components/shared/large/GlobalTable';
import ParkingFloor from '../../../../components/shared/large/ParkingFloor';
import { PrimaryWidgetCard, SecondaryWidgetCard } from '../../../../components/shared/large/WidgetCard';
import { bookingSummaryColumnsBuildingInfo } from '../../parkingSummary/components/ParkingSummaryColumns';
import { alertsData, parkingFloorListData } from '../utils/buildingData';
import BuildingData from './BuildingData';
import RevenueOverview from './RevenueOverview';
import { useGetSingleBuildingQuery } from '../../../../redux/apis/buildingApis';
import { useGetBookingSummaryOfBuildingForAdminQuery } from '../../../../redux/apis/bookingApis';
import { useGetFloorsOfSingleBuildingQuery } from '../../../../redux/apis/floorApis';
import { useGetBuildingOverallAnalyticsQuery } from '../../../../redux/apis/buildingApis';
import { useGetBuildingAnalyticsQuery } from '../../../../redux/apis/buildingApis';
import { useEffect, useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import useDebounce from '../../../../components/hooks/useDebounce';

const BuildingView = () => {
  const navigate = useNavigate();
  const [buildingData, setBuildingData] = useState(null);
  const [bookingSummary, setBookingSummary] = useState(null);
  const [buildingFloorsData, setBuildingFloorsData] = useState(null);
  const [spacesCardsData, setSpacesCardsData] = useState(null);
  const buildingId = useParams().id;
  const { data } = useGetSingleBuildingQuery(buildingId);
  const { data: bookingSummaryData } = useGetBookingSummaryOfBuildingForAdminQuery(buildingId);

  const [searchInput, setSearchInput] = useState('');
  const floorName = useDebounce(searchInput, 1000);
  const { data: buildingFloors } = useGetFloorsOfSingleBuildingQuery({ buildingId, floorName });

  // new state for filter-based analytics
  const [filterState, setFilterState] = useState({
    cardType: null,
    filter: 'daily',
  });

  const { data: buildingAnalytics } = useGetBuildingOverallAnalyticsQuery({ buildingId });

  const { data: buildingAnalyticsPerFilter } = useGetBuildingAnalyticsQuery(
    filterState.cardType && filterState.filter
      ? { buildingId, cardType: filterState.cardType, filter: filterState.filter }
      : skipToken
  );

  useEffect(() => {
    if (buildingAnalytics) {
      setSpacesCardsData([
        ...buildingAnalytics?.data,
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
  }, [buildingAnalytics]);

  useEffect(() => {
    if (buildingAnalyticsPerFilter) {
      setSpacesCardsData((prev) =>
        prev.map((card) =>
          card.cardType === buildingAnalyticsPerFilter.data.cardType ? buildingAnalyticsPerFilter.data : card
        )
      );
    }
  }, [buildingAnalyticsPerFilter]);

  // handle callback from child
  const handleFilterChange = (cardType, filter) => {
    setFilterState({ cardType, filter });
  };

  useEffect(() => {
    if (data) {
      setBuildingData(data?.data);
    }
    if (bookingSummaryData) {
      setBookingSummary(bookingSummaryData?.data);
    }
    if (buildingFloors) {
      setBuildingFloorsData(buildingFloors?.data);
    }
  }, [data, bookingSummaryData, buildingFloors]);

  // // // // // // // // // //
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-3 bg-red-600 flex">
        <BuildingData data={buildingData} />
      </div>
      <div className="col-span-12 lg:col-span-6">
        {/* <SpacesCards cardData={spacesCardsData} /> */}
        <div className="flex flex-wrap gap-4">
          {spacesCardsData?.map((card, i) => {
            if (i < 3) {
              return (
                <PrimaryWidgetCard
                  key={i}
                  cardData={card}
                  buildingId={buildingId}
                  cardType={card?.cardType}
                  onFilterChange={handleFilterChange}
                />
              );
            } else if (i == 3) {
              return <SecondaryWidgetCard key={i} cardData={card} />;
            }
          })}
        </div>
        <RevenueOverview buildingId={buildingId} />
      </div>
      <div className="col-span-12 lg:col-span-3">
        <Alerts alertsData={alertsData} />
      </div>

      <div className="col-span-12 border border-[#6F6F6F1F] rounded-lg shadow-md bg-white p-2">
        <GlobalTable
          heading="Booking Summary"
          columns={bookingSummaryColumnsBuildingInfo(navigate)}
          data={bookingSummary || []}
        />
      </div>
      <div className="col-span-12">
        <div className="md:border md:border-[#E7E7E7] md:shadow-md md:rounded-[16px]">
          <div className="flex items-center justify-between gap-4 py-4 md:px-6">
            <h2 className="text-base font-bold text-[#414141]">Parking Floors</h2>
            <div className="flex items-center gap-2 bg-[#F9FBFF] border border-[#e7e7e7] rounded-[10px] py-2 px-4">
              <CiSearch fontSize={20} color="#7E7E7E" />
              <input
                type="text"
                placeholder="Search"
                className="w-full text-xs md:text-base bg-transparent border-none focus:outline-none text-[#7E7E7E]"
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
          <div className="border-t border-[#E7E7E7]"></div>
          <div className="pb-4 md:px-6">
            <ParkingFloor data={buildingFloorsData} linkTo={(id) => `/admin/floor-view/${id}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingView;
