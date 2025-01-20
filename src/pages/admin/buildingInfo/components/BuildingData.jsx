import React from 'react'
import { PinIcon } from '../../../../assets/svgs/Icon';

const BuildingData = ({ data }) => {
    return (
      <div className="border border-[#6F6F6F1F] rounded-lg shadow-md bg-white flex-1">
        <img
          src={data?.image || "https://placehold.co/600x400"}
          alt="image"
          className="w-full h-[200px] object-cover rounded-lg"
        />
  
        <div className="p-4">
          <h6 className="text-base md:text-xl font-bold">
            {data?.buildingName || "Washington Square Parking"}
          </h6>
  
          <div className="flex items-center gap-1">
            <PinIcon />
            <p className="text-[10px] font-semibold text-[#47484B87]">
              {data?.address || "1051 18th St NW, Washington, DC 20006"}
            </p>
          </div>
  
          <div className="flex justify-between gap-4 mt-4">
            <div>
              <SectionTitle title="Name" />
              <p className="text-xs font-semibold text-[#11111199]">
                {data?.managerName || "John Doe"}
              </p>
            </div>
            <div>
              <SectionTitle title="Contact Number" />
              <p className="text-xs font-semibold text-[#11111199]">
                {data?.contactNumber || "+123 123 12131"}
              </p>
            </div>
          </div>
          <div className="mt-4 pl-0 md:px-5">
            <InfoText label="ID Number" value={data?.idNumber || "234242423423"} />
            <div className="flex justify-between gap-4 mt-4">
              <InfoText label="Area" value={data?.area || "15000m"} isCentered />
              <InfoText
                label="Slots"
                value={data?.totalFloors || "4521"}
                isCentered
              />
            </div>
            <div className="flex justify-between gap-4 mt-4">
              <InfoText label="Area" value={data?.area || "15000m"} isCentered />
              <InfoText
                label="Sensors"
                value={data?.totalFloors || "24f"}
                isCentered
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

export default BuildingData

const InfoText = ({ label, value, isCentered = false }) => (
    <div className={isCentered ? "text-center" : ""}>
      <h6 className="text-xs font-semibold text-[#11111199]">{label}</h6>
      <p className="text-base font-semibold text-[#414141]">{value}</p>
    </div>
  );
  
  // Reusable section title component
  const SectionTitle = ({ title }) => (
    <h6 className="text-base font-semibold text-[#414141]">{title}</h6>
  );