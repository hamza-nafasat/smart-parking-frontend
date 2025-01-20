import React from "react";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

const EarningCard = ({ earning, booking }) => {
  return (
    <div className="xl:bg-[url('/src/assets/images/wallet/wallet-head-img.png')] bg-primary flex flex-wrap items-center justify-between gap-4 rounded-[18px] px-4 py-4 md:py-6 md:px-8 bg-no-repeat bg-right bg-origin-content">
      <div>
        <h3 className="text-base md:text-lg font-bold text-white">
          Your Today Total Earning
        </h3>
        <h4 className="my-4 text-2xl md:text-[44px] font-bold text-white">
          $ {earning}
        </h4>
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 bg-[#ffffff50] flex justify-center items-center rounded-full">
            <BsFillArrowUpRightCircleFill fontSize={20} color="#fff" />
          </div>
          <p className="text-xs font-bold text-white">12%</p>
        </div>
      </div>
      <div>
        <h3 className="text-base md:text-lg font-bold text-white">
          Total Today Booking
        </h3>
        <h4 className="my-1 text-base md:text-xl font-bold text-white">
          {booking}
        </h4>
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 bg-[#ffffff50] flex justify-center items-center rounded-full">
            <BsFillArrowUpRightCircleFill fontSize={20} color="#fff" />
          </div>
          <p className="text-xs font-bold text-white">8%</p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default EarningCard;
