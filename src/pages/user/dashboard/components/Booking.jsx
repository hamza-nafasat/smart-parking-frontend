import React, { useState } from "react";
import { BackIcon, PinIcon, T20for7Icon } from "../../../../assets/svgs/Icon";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../../components/shared/small/Button";
import slotsImg from "../../../../assets/images/default/slots.png";
import qrImg from "../../../../assets/images/default/qr.png";
import Modal from "../../../../components/shared/small/Modal";
import Input from "../../../../components/shared/small/Input";

const Booking = () => {
  const [modal, setModal] = useState(false);
  const modalOpenHandler = () => setModal(true);
  const modalCloseHandler = () => setModal(false);
  const navigate = useNavigate();
  return (
    <div className="flex md:flex-row flex-col gap-4 py-4">
      <div className="w-[32px] cursor-pointer" onClick={() => navigate(-1)}>
        <BackIcon />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-[500]">Book a parking spot</h1>
          <div className="my-3">
            <Heading heading="Car details" />
          </div>
          <Input type="text" placeholder="ex: 2231 ATD" label="License plate" />

          <div className="my-3">
            <Heading heading="Contact information" />
          </div>
          <Input
            type="number"
            placeholder="+1xxxx xxx xxx"
            label="Phone number"
          />
          <Input type="text" placeholder="+example@gmail.com" label="E-mail" />

          <div className="mt-4 md:mt-6">
            <Link to="/user/confirm-booking">
              <Button text="Proceed to payment ( 30.00 USD )" width="w-full" />
            </Link>
          </div>
        </div>
        <div className="bg-[#ECECEC] p-4 rounded-lg flex items-center justify-center flex-col gap-3">
          <div className="flex flex-wrap items-center gap-4 ">
            <img
              src="https://placehold.co/200x300"
              alt="image"
              className="w-full md:w-[227px] h-[113px] object-cover rounded-lg"
            />
            <div>
              <h5 className="text-sm font-bold text-[#414141]">
                Colonial Parking - Lot 755
              </h5>
              <div className="my-1 flex items-center gap-1">
                <PinIcon />
                <p className="text-[10px] font-medium text-[#9FA1A8]">
                  1220 E St NW, Washington, DC 20004
                </p>
              </div>
              <div className="my-1 flex items-center gap-1">
                <T20for7Icon />
                <p className="text-[10px] font-medium text-[#9FA1A8]">
                  24 hours CCTV and Parking services
                </p>
              </div>
            </div>
          </div>
          <img
            src={slotsImg}
            alt="img"
            className="w-full sm:w-[350px] md:w-[400px]"
          />
          <div className="w-full px-5 ">
            <List list={{ title: "From", value: "Basement B-1" }} />
            <List
              list={{ title: "Date", value: "10 July 2024-12:00am to 06:00pm" }}
            />
            <List list={{ title: "Spot", value: "B-13" }} />
            <div className="border-y-[2px] border-[#00000070] py-2 my-2">
              <List list={{ title: "Sub total", value: "25.00 USD" }} />
              <List list={{ title: "Service fee", value: "5.00 USD" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;

const Heading = ({ heading }) => {
  return (
    <h4 className="mt-4 text-[#414141] text-base md:text-lg font-bold">
      {heading}
    </h4>
  );
};

const List = ({ list }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <h6 className="text-xs sm:text-sm font-bold text-[#414141]">
        {list?.title}
      </h6>
      <p className="text-xs sm:text-sm font-semibold text-[#101B19CC]">
        {list?.value}
      </p>
    </div>
  );
};
