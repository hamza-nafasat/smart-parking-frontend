import React, { useState } from "react";
import { BackIcon, PinIcon, T20for7Icon } from "../../../../assets/svgs/Icon";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/shared/small/Button";
import slotsImg from "../../../../assets/images/default/slots.png";
import qrImg from "../../../../assets/images/default/qr.png";
import Modal from "../../../../components/shared/small/Modal";

const UserViewSlip = () => {
  const [modal, setModal] = useState(false);
  const modalOpenHandler = () => setModal(true);
  const modalCloseHandler = () => setModal(false);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row gap-4 py-4">
      <div className="w-[32px] cursor-pointer" onClick={() => navigate(-1)}>
        <BackIcon />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
        <div>
          <div className="flex flex-wrap items-center gap-4 mb-4">
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
          <Heading heading="Car & Contact info" />
          <List list={{ title: "Licence plate", value: "LEX 4521" }} />
          <List list={{ title: "Phone number", value: "+124 3641 061" }} />
          <List list={{ title: "E-mail", value: "jhon@leogmail.com" }} />
          <Heading heading="Parking spot detail" />
          <List list={{ title: "Floor", value: "Basement B-1" }} />
          <List
            list={{ title: "Date", value: "10 July 2024-12:00am to 06:00pm" }}
          />
          <List list={{ title: "Spot", value: "B-12" }} />
          <Heading heading="Payment Transaction details" />
          <List list={{ title: "From", value: "0232392449343022" }} />
          <List list={{ title: "To", value: "company account" }} />
          <List list={{ title: "Amount", value: "30.00 USD" }} />
          <div className="mt-4 md:mt-6">
            <Button
              text="Get QR Code"
              width="w-full"
              onClick={modalOpenHandler}
            />
          </div>
        </div>
        <div className="bg-[#ECECEC] p-4 rounded-lg flex items-center justify-center">
          <img
            src={slotsImg}
            alt="img"
            className="w-full sm:w-[350px] md:w-[400px]"
          />
        </div>
      </div>
      {modal && (
        <Modal
          onClose={modalCloseHandler}
          title="Thank you!"
          width="w-[300px] md:w-[600px]"
        >
          <QRCode />
        </Modal>
      )}
    </div>
  );
};

export default UserViewSlip;

const QRCode = () => {
  return (
    <div>
      <div className="border-t-[3px] border-dashed border-[#A8ABAB]"></div>
      <h6 className="my-4 text-base md:text-xl font-bold text-[#414141]">
        QR Code
      </h6>
      <img src={qrImg} alt="image" className="w-[190px] mx-auto" />
      <div className="border-t-[3px] border-dashed border-[#A8ABAB] my-4"></div>
      <ModalList list={{ title: "Time", value: "Spot Amount" }} />
      <ModalList
        list={{ title: "11:30am", value: "25.00 USD" }}
        weight="font-medium"
      />
      <div className="mt-1">
        <ModalList list={{ title: "Date", value: "Service Charges" }} />
        <ModalList
          list={{ title: "10/7/2023", value: "05.00" }}
          weight="font-medium"
        />
      </div>
      <div className="mt-1">
        <ModalList list={{ title: "From", value: "To" }} />
        <ModalList
          list={{ title: "23923023202", value: "202302302392" }}
          weight="font-medium"
        />
      </div>
      <div className="mt-4 md:mt-6 flex items-center justify-center gap-4">
        <Button text="Save" width="w-[162px]" height="h-[45px] md:h-[55px]" />
        <Button
          text="Share"
          width="w-[162px]"
          bg="bg-white hover:bg-primary hover:text-white"
          color="text-primary"
          height="h-[45px] md:h-[55px]"
        />
      </div>
    </div>
  );
};

const ModalList = ({ list, weight }) => {
  return (
    <div className="flex items-center justify-between">
      <h6
        className={`text-base ${weight ? weight : "font-bold"} text-[#414141]`}
      >
        {list?.title}
      </h6>
      <h6
        className={`text-base ${weight ? weight : "font-bold"} text-[#414141]`}
      >
        {list?.value}
      </h6>
    </div>
  );
};

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
