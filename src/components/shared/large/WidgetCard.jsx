/* eslint-disable react/prop-types */
import React from 'react';
import BlankAreaChart from '../../charts/BlankAreaChart';
import { ParkingSensorIcon } from '../../../assets/svgs/Icon';
import { useState, useEffect } from 'react';
import { useGetBuildingAnalyticsForAdminQuery } from '../../../redux/apis/buildingApis';
import { PerformanceIcon, FreeSpaceIcon, OccupiedParkingIcon } from '../../../assets/svgs/Icon';

const PrimaryWidgetCard = ({ cardData, cardType, onFilterChange }) => {
  const iconMap = {
    performance: <PerformanceIcon />,
    freeSpace: <FreeSpaceIcon />,
    occupiedSpace: <OccupiedParkingIcon />,
  };
  const [filter, setFilter] = useState('daily');

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    onFilterChange(cardType, newFilter);
  };

  return (
    <div className="border border-[#6F6F6F1F] rounded-lg shadow-md bg-white px-6 py-4 w-[300px] grow">
      <div className="flex items-center justify-between gap-4">
        <h6 className="text-sm font-semibold text-[#292D32]">{cardData.title}</h6>
        <select
          className="border-[0.4px] border-[#5C5B5B80] rounded-[4px] text-[#5C5B5B80] text-[11px] outline-none"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="daily" className="text-[11px] text-[#5C5B5B80]">
            Daily
          </option>
          <option value="monthly" className="text-[11px] text-[#5C5B5B80]">
            Monthly
          </option>
        </select>
      </div>
      <div className="flex items-center justify-center gap-3">
        <div className="w-10">{iconMap[cardData?.cardType]}</div>
        <div>
          <div className="flex items-center gap-3">
            <BlankAreaChart data={cardData?.data} areaColor={cardData?.color} />
            <h4 className="text-xl md:text-[27px] font-bold" style={{ color: cardData?.color }}>
              {cardData?.value}%
            </h4>
          </div>
          <p className="text-xs" style={{ color: cardData?.color }}>
            {cardData?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const SecondaryWidgetCard = ({ cardData }) => {
  return (
    <div className="border border-[#6F6F6F1F] rounded-lg shadow-md bg-white px-6 py-4 w-[300px] grow">
      <div className="flex items-center justify-between gap-4">
        <h6 className="text-sm font-semibold text-[#292D32]">Sensor Status</h6>
        <select className="border-[0.4px] border-[#5C5B5B80] rounded-[4px] text-[#5C5B5B80] text-[11px] outline-none">
          <option value="daily" className="text-[11px] text-[#5C5B5B80]">
            Daily
          </option>
          <option value="monthly" className="text-[11px] text-[#5C5B5B80]">
            Monthly
          </option>
        </select>
      </div>
      <div className="flex items-center justify-around gap-5 mt-4">
        <div>
          {cardData?.map((single, i) => (
            <List single={single} key={i} />
          ))}
        </div>
        <div className="flex flex-col items-center gap-1">
          <ParkingSensorIcon />
          <p className="text-xs font-medium text-[#414141]">Parking Sensor</p>
        </div>
      </div>
    </div>
  );
};

const List = ({ single }) => {
  return (
    <h6 className="text-[10px] text-[#11111199]">
      {single?.type}: <span className="font-medium text-[#414141]">{single?.count}</span>
    </h6>
  );
};

export { PrimaryWidgetCard, SecondaryWidgetCard };
