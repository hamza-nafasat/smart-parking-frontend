import { Link, useNavigate } from 'react-router-dom';
import { BackIcon, PinIcon, T20for7Icon } from '../../../../assets/svgs/Icon';
import Button from '../../../../components/shared/small/Button';
import Input from '../../../../components/shared/small/Input';
import { useState } from 'react';

const Booking = () => {
  const [form, setForm] = useState({
    licensePlate: '',
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    startTime: '',
    endTime: '',
  });
  const navigate = useNavigate();
  return (
    <div className="flex md:flex-row flex-col gap-4 py-4">
      <div className="w-[32px] cursor-pointer" onClick={() => navigate(-1)}>
        <BackIcon />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
        <h1 className="text-3xl font-[500]">Book a parking spot</h1>
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
            type="number"
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
        <div className="mt-4 md:mt-6 w-full">
          <Link to="/user/confirm-booking">
            <Button text="Proceed to payment ( 30.00 USD )" className="!w-full" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Booking;

const Heading = ({ heading }) => {
  return <h4 className="mt-4 text-[#414141] text-base md:text-lg font-bold">{heading}</h4>;
};

const List = ({ list }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <h6 className="text-xs sm:text-sm font-bold text-[#414141]">{list?.title}</h6>
      <p className="text-xs sm:text-sm font-semibold text-[#101B19CC]">{list?.value}</p>
    </div>
  );
};
