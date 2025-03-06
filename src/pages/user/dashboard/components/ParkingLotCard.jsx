/* eslint-disable react/prop-types */
import { LocationIcon, TwentyFourSevenIcon } from '../../../../assets/svgs/Icon';
import Button from '../../../../components/shared/small/Button';
import { Link } from 'react-router-dom';

const ParkingLotCard = ({ level = 'high', item, inMap = false }) => {
  return (
    <div className={`${inMap ? '' : 'border-[2px] shadow-sm rounded-lg p-3'}`}>
      <div className="mb-1 ml-2">
        <AvailabilityBar level={level} />
      </div>
      <div className="flex flex-col md:flex-row gap-2 items-center mb-3">
        <img
          src={item?.twoDImage?.url}
          alt="image"
          className={`${
            inMap ? 'w-[100px] h-[97px] rounded-xl object-cover' : 'w-[181px] h-[97px] rounded-xl object-cover'
          }`}
        />
        <div className={`${inMap ? 'flex flex-col' : 'flex flex-col gap-1'}`}>
          <h3 className="text-base md:text-lg font-bold">{item.name}</h3>
          <div className="flex gap-2 items-center">
            <LocationIcon />
            <p className="text-[#9FA1A8] text-[10px]">{item?.address}</p>
          </div>
          <div className="flex gap-2 items-center">
            <TwentyFourSevenIcon />
            <p className="text-[#9FA1A8] text-[10px]">24 hours CCTV and Parking services</p>
          </div>
        </div>
      </div>
      <div className={`${inMap ? '' : 'p-2 border-y-[1px] my-2'}`}>
        <p className="text-[#B5B7C0] text-sm font-[500]">Near : M1 line & line 152 ,13. 32</p>
      </div>
      <Link to={`/user/booking-slot/${item?._id}`}>
        <Button text="Book a Spot" width="w-full md:w-[120px]" />
      </Link>
    </div>
  );
};

export default ParkingLotCard;

const AvailabilityBar = ({ level }) => {
  const getFillLevel = () => {
    switch (level) {
      case 'high':
        return 3;
      case 'medium':
        return 2;
      case 'low':
        return 1;
      default:
        return 0;
    }
  };

  const fillLevel = getFillLevel();

  return (
    <div className="flex gap-1 items-center ">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className={`w-[19px] h-[8px] rounded ${index < fillLevel ? 'bg-[#18BC9C]' : 'bg-[#E5E9E8]'}`}
        />
      ))}
      <p className="text-sm text-[#B5B7C0] capitalize">{level} Availability</p>
    </div>
  );
};

export { AvailabilityBar };
