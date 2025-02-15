/* eslint-disable react/prop-types */

import { FloorNameIcon } from "../../../assets/svgs/Icon";

const FloorDetail = ({ data }) => {
  return (
    <div className="bg-white p-4 border-[1px] shadow-md rounded-lg h-full">
      <h2 className="mb-2">Floor Details</h2>
      <div className="flex gap-5 items-center flex-wrap">
        <img src={data?.twoDImage?.url} alt="image" className="size-[150] rounded-lg object-cover" />
        <div className="flex flex-col gap-2">
          <List title="Floor Name" subtitle={data?.name} icon={<FloorNameIcon />} />
          {/* <List title="Category" subtitle="Commercial" icon={<CategoryIcon />} /> */}
          {/* <List title="Area" subtitle="65,000 SF" icon={<AreaIcon />} /> */}
        </div>
      </div>
    </div>
  );
};

export default FloorDetail;

const List = ({ icon, title, subtitle }) => {
  return (
    <div>
      <div className="flex gap-1 items-center">
        <span>{icon}</span>
        <p className="text-sm font-[700] text-[#20312EB2]">{title}</p>
      </div>
      <p className="text-sm font-[700] text-[#414141]">{subtitle}</p>
    </div>
  );
};
