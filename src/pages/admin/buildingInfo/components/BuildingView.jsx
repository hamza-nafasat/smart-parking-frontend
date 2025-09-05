import { CiSearch } from 'react-icons/ci';
import { useNavigate, useParams } from 'react-router-dom';
import Alerts from '../../../../components/shared/large/Alerts';
import GlobalTable from '../../../../components/shared/large/GlobalTable';
import ParkingFloor from '../../../../components/shared/large/ParkingFloor';
import { PrimaryWidgetCard, SecondaryWidgetCard } from '../../../../components/shared/large/WidgetCard';
import { bookingSummaryColumnsBuildingInfo } from '../../parkingSummary/components/ParkingSummaryColumns';
import { alertsData, parkingFloorListData, spacesCardsData } from '../utils/buildingData';
import BuildingData from './BuildingData';
import RevenueOverview from './RevenueOverview';
import { useGetSingleBuildingForAdminQuery } from '../../../../redux/apis/buildingApis';
import { useGetAllFloorsQuery } from '../../../../redux/apis/floorApis';
import { useGetBookingSummaryOfBuildingForAdminQuery } from '../../../../redux/apis/bookingApis';
import { useGetSingleBuildingFloorsForAdminQuery } from '../../../../redux/apis/floorApis';
import { useEffect, useState } from 'react';

const BuildingView = () => {
  const navigate = useNavigate();
  const [buildingData, setBuildingData] = useState(null);
  const [bookingSummary, setBookingSummary] = useState(null);
  const [buildingFloorsData, setBuildingFloorsData] = useState(null);
  const buildingId = useParams().id;
  const { data } = useGetSingleBuildingForAdminQuery(buildingId);
  const { data: floorsData } = useGetAllFloorsQuery(buildingId);
  const { data: bookingSummaryData } = useGetBookingSummaryOfBuildingForAdminQuery(buildingId);
  const { data: buildingFloors } = useGetSingleBuildingFloorsForAdminQuery(buildingId);

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
  // // // // // // // // //
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
              return <PrimaryWidgetCard key={i} cardData={card} id={buildingId} cardType={card?.cardType} />;
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
