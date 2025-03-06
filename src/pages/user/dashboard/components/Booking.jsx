/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BackIcon } from '../../../../assets/svgs/Icon';
import Button from '../../../../components/shared/small/Button';
import Input from '../../../../components/shared/small/Input';
import { useGetSingleSlotQuery } from '../../../../redux/apis/slotApis';
import { addBookingInDetails } from '../../../../redux/slices/bookingSlice';
import toast from 'react-hot-toast';

const Booking = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { booking } = useSelector((state) => state?.booking);
  const { data: slot } = useGetSingleSlotQuery(params?.slotId);
  const [form, setForm] = useState({
    licensePlate: '',
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    startTime: '',
    endTime: '',
  });
  console.log('single', slot);

  const createBookingHandler = async () => {
    if (
      !form?.startTime ||
      !form?.endTime ||
      !form?.email ||
      !form?.contact ||
      !form?.licensePlate ||
      !form?.firstName ||
      !form?.lastName ||
      !slot?.data?.floor?.name ||
      !slot?.data?.floor?.twoDImage ||
      !slot?.data?.id ||
      !slot?.data?.building?.address ||
      !slot?.data?.building?.name
    )
      return toast.error('Please Enter All Fields');
    try {
      const data = {
        slotId: params.slotId,
        slotName: slot?.data?.id,
        startTime: form?.startTime,
        endTime: form?.endTime,
        firstName: form?.firstName,
        lastName: form?.lastName,
        email: form?.email,
        contactNumber: form?.contact,
        plateNumber: form?.licensePlate,
        floorName: slot?.data?.floor?.name,
        floorImage: slot?.data?.floor?.twoDImage?.url,
        buildingName: slot?.data?.building?.name,
        buildingAddress: slot?.data?.building?.address,
      };
      await dispatch(addBookingInDetails(data));
      return navigate('/user/confirm-booking');
    } catch (error) {
      console.log('error in storing booking', error);
    }
  };

  useEffect(() => {
    if (booking?.slotId) {
      setForm({
        licensePlate: booking?.plateNumber || '',
        firstName: booking?.firstName || '',
        lastName: booking?.lastName || '',
        contact: booking?.contactNumber || '',
        email: booking?.email || '',
        startTime: booking?.startTime || '',
        endTime: booking?.endTime || '',
      });
    }
  }, [booking]);

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex items-center gap-2">
        <div className="w-[32px] cursor-pointer" onClick={() => navigate(-1)}>
          <BackIcon />
        </div>
        <h1 className="text-3xl font-[500]">Book a parking spot</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        {/* first column  */}
        <div className="flex flex-col gap-2">
          <div className="my-3">
            <Heading heading="Car details" />
          </div>
          <Input
            type="text"
            placeholder="ex: 2231 ATD"
            label="License plate"
            value={form.licensePlate}
            onChange={(e) => setForm({ ...form, licensePlate: e.target.value })}
          />
          <div className="my-3">
            <Heading heading="Time and date Details" />
          </div>
          <Input
            type="datetime-local"
            label="Start Time"
            value={form.startTime}
            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
          />
          <Input
            type="datetime-local"
            label="End Time"
            value={form.endTime}
            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
          />
        </div>
        {/* first column  */}
        <div className="flex flex-col gap-2">
          <div className="my-3">
            <Heading heading="Contact information" />
          </div>
          <Input
            type="text"
            placeholder="John"
            label="First name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Doe"
            label="Last name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
          <Input
            type="tel"
            placeholder="+1xxxx xxx xxx"
            label="Phone number"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
          />
          <Input
            type="email"
            placeholder="+example@gmail.com"
            label="E-mail"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
      </div>
      <div className="mt-4 md:mt-6 w-full">
        <Button onClick={createBookingHandler} text="Book Now" className={`!w-full `} />
      </div>
    </div>
  );
};

export default Booking;

const Heading = ({ heading }) => {
  return <h4 className="mt-4 text-[#414141] text-base md:text-lg font-bold">{heading}</h4>;
};

// const List = ({ list }) => {
//   return (
//     <div className="flex items-center justify-between gap-4">
//       <h6 className="text-xs sm:text-sm font-bold text-[#414141]">{list?.title}</h6>
//       <p className="text-xs sm:text-sm font-semibold text-[#101B19CC]">{list?.value}</p>
//     </div>
//   );
// };
