import {
  BsArrowUpRightCircleFill,
  BsFillArrowUpRightCircleFill,
} from "react-icons/bs";
import walletBg from "../../../../assets/images/dashboard/walletBg.png";
import { FaChevronUp } from "react-icons/fa6";
// import Dropdown from "../shared/small/Dropdown";

const data = [
  { option: "This week" },
  { option: "This month" },
  { option: "This year" },
];

const Wallet = () => {
  return (
    <div
      className=" bg-cover rounded-2xl "
      style={{ backgroundImage: `url(${walletBg})` }}
    >
      <div className="p-5  text-white flex justify-between md:flex-row flex-col-reverse ">
        <div className="w-full">
          <div className=" mb-2 md:mb-5 mt-1 md:mt-3 flex flex-col gap-1 md:gap-2 w-full">
            <div className="flex justify-between items-center">
              <h6 className="text-base md:text-lg font-[700]">
                Your Today Total Earning
              </h6>
              <button className="font-bold underline text-xs  sm:text-sm md:text-base">
                View Details
              </button>
            </div>

            <h2 className="text-xl md:text-4xl font-[700]">$ 2120.00</h2>
            <div className="text-xs md:text-base  flex items-center gap-2">
              <div className="w-9 h-9 bg-[#ffffff50] flex justify-center items-center rounded-full">
                <BsFillArrowUpRightCircleFill fontSize={22} />{" "}
              </div>
              <h5 className="font-bold">12%</h5>
            </div>
          </div>
          <div className="flex flex-col gap-1 md:gap-2 my-2 md:my-5">
            <h5 className="text-base md:text-xl font-[700]">
              Total Today Booking
            </h5>
            <h5 className="text-lg md:text-3xl font-[700]">242</h5>

            <div className="text-xs md:text-base  flex items-center gap-2">
              <div className="w-9 h-9 bg-[#ffffff50] flex justify-center items-center rounded-full">
                <BsFillArrowUpRightCircleFill fontSize={22} />{" "}
              </div>
              <h5 className="font-bold">12%</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
