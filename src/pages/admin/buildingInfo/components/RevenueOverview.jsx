import React, { useEffect } from 'react';
import { useState } from 'react';
import CustomAreaChart from '../../../../components/charts/CustomAreaChart';
import { useGetRevenueOverviewForSingleBuildingQuery } from '../../../../redux/apis/buildingApis';

const revenueData = [
  { name: '02 july', uv: 2455.0 },
  { name: '03 july', uv: 1455.0 },
  { name: '05 july', uv: 3566.0 },
  { name: '11 july', uv: 1111.0 },
  { name: '12 july', uv: 1245.0 },
  { name: '15 july', uv: 1355.0 },
  { name: '16 july', uv: 4444.0 },
  { name: '17 july', uv: 3566.0 },
  { name: '19 july', uv: 2566.0 },
  { name: '21 july', uv: 3566.0 },
  { name: '24 july', uv: 4455.0 },
  { name: '24 july', uv: 3333.0 },
  { name: '25 july', uv: 3455.0 },
  { name: '26 july', uv: 3566.0 },
];

const RevenueOverview = ({ buildingId }) => {
  const [type, setType] = useState('Weekly');
  const [revenueData, setRevenueData] = useState([]);
  const { data } = useGetRevenueOverviewForSingleBuildingQuery({ type, buildingId });

  useEffect(() => {
    if (data) {
      setRevenueData(data?.data);
    }
  }, [data]);

  //--------------
  return (
    <div className="bg-white rounded-lg border-[1px] shadow-lg mt-4 flex-1">
      <div className="flex items-center justify-between p-4">
        <h3 className="font-bold text-base">Revenue Overview</h3>
        <select
          className="border border-[#82828299] py-1 px-[6px] rounded-md outline-none text-[#071A17CC] font-medium text-xs"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value="Weekly" className="text-xs text-[#071A17CC]">
            Weekly
          </option>
          <option value="Monthly" className="text-xs text-[#071A17CC]">
            Monthly
          </option>
          <option value="Yearly" className="text-xs text-[#071A17CC]">
            Yearly
          </option>
        </select>
      </div>
      <CustomAreaChart data={revenueData} showGradient height={200} />
    </div>
  );
};

export default RevenueOverview;
