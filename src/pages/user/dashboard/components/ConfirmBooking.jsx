/* eslint-disable react/prop-types */
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BackIcon, PinIcon, T20for7Icon } from '../../../../assets/svgs/Icon';
import Button from '../../../../components/shared/small/Button';
import { useCreateBookingMutation } from '../../../../redux/apis/bookingApis';
import { removeBookingInDetails } from '../../../../redux/slices/bookingSlice';
import { timeFormate } from '../../../../utils/features';

const ConfirmBooking = () => {
  const dispatch = useDispatch();
  const [createBooking, { isLoading }] = useCreateBookingMutation();
  const { booking } = useSelector((state) => state?.booking);

  const createBookingHandler = async (e) => {
    e.preventDefault();
    const { slotId, contactNumber, plateNumber, email, endTime, firstName, lastName, startTime } = booking;
    if (!contactNumber || !plateNumber || !email || !endTime || !firstName || !lastName || !startTime || !slotId)
      return toast.error('Please Select All Fields');
    const data = { slotId, startTime, endTime, firstName, lastName, email, contactNumber, plateNumber };
    try {
      const res = await createBooking(data).unwrap();
      toast.success(res?.message);
      dispatch(removeBookingInDetails());
      navigate('/user');
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
      console.log(error);
    }
  };

  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row gap-4 py-4">
      <div className="w-[32px] cursor-pointer" onClick={() => navigate(-1)}>
        <BackIcon />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-[500]">Book a parking spot</h1>
          <div>
            <Heading heading="Car & Contact info" />
            <div className="flex flex-col gap-[0.7rem]">
              <List list={{ title: 'First Name', value: booking?.firstName }} />
              <List list={{ title: 'Last Name', value: booking?.lastName }} />
              <List list={{ title: 'License plate', value: booking?.plateNumber }} />
              <List list={{ title: 'Phone number', value: booking?.contactNumber }} />
              <List list={{ title: 'E-mail', value: booking?.email }} />
            </div>

            <Heading heading="Payment Transaction details" />
            <div className="flex flex-col gap-2">
              <List list={{ title: 'From', value: '0232392449343022' }} />
              <List list={{ title: 'To', value: 'company account' }} />
              <List list={{ title: 'Amount', value: '30.00 USD' }} />
            </div>
            <div className="mt-4 md:mt-6">
              {/* <Link to="/user/payment-success"> */}
              <Button
                onClick={createBookingHandler}
                text="Confirm Booking"
                disabled={isLoading}
                width={`w-full ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
              />
              {/* </Link> */}
            </div>
          </div>
        </div>
        <div className="bg-[#ECECEC] p-4 rounded-lg flex items-center justify-center flex-col gap-3">
          <div className="flex flex-wrap items-center gap-4 ">
            <h5 className="text-sm font-bold text-[#414141]">{booking?.buildingName}</h5>
            <div className="my-1 flex items-center gap-1">
              <PinIcon />
              <p className="text-[10px] font-medium text-[#9FA1A8]">{booking?.buildingAddress}</p>
            </div>
            <div className="my-1 flex items-center gap-1">
              <T20for7Icon />
              <p className="text-[10px] font-medium text-[#9FA1A8]">24 hours CCTV and Parking services</p>
            </div>
          </div>
          <img src={booking?.floorImage} alt="img" className="w-full sm:w-[350px] md:w-[400px]" />
          <div className="w-full px-5 ">
            <List list={{ title: 'From', value: `${booking?.floorName}` }} />
            <List
              list={{ title: 'Date', value: `${timeFormate(booking?.startTime)} - ${timeFormate(booking?.endTime)}` }}
            />
            <List list={{ title: 'Spot', value: booking?.slotName }} />
            <div className="border-y-[2px] border-[#00000070] py-2 my-2">
              <List list={{ title: 'Sub total', value: '25.00 USD' }} />
              <List list={{ title: 'Service fee', value: '5.00 USD' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;

const Heading = ({ heading }) => {
  return <h4 className="my-4 text-[#414141] text-base md:text-xl font-bold">{heading}</h4>;
};

const List = ({ list }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <h6 className="text-xs sm:text-sm font-bold text-[#414141]">{list?.title}</h6>
      <p className="text-xs sm:text-sm font-semibold text-[#101B19CC]">{list?.value}</p>
    </div>
  );
};
