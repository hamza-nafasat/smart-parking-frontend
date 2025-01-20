import qrImg from "../../../../assets/images/default/qr.png";
import Button from "../../../../components/shared/small/Button";
import failBg from "../../../../assets/images/dashboard/payment-fail-bg.png";
import fail from "../../../../assets/images/dashboard/payment-fail.png";
import successBg from "../../../../assets/images/dashboard/payment-success-bg.png";
import success from "../../../../assets/images/dashboard/payment-success.png";

import { TbSlash } from "react-icons/tb";
import { MdOutlineDone } from "react-icons/md";

const Payment = ({ varient }) => {
  return (
    <div>
      <div className="grid  grid-cols-1 xl:grid-cols-2 gap-4 w-full items-center">
        <div className="p-0 md:p-5">
          <QRCode varient={varient} />
        </div>
        <div className="bg-[#ECECEC]  rounded-lg md:flex items-center justify-center flex-col gap-3 hidden ">
          {varient == "success" ? (
            <div
              style={{ backgroundImage: `url(${successBg})` }}
              className="bg-cover bg-center h-screen w-full"
            >
              <div className="flex flex-col items-center justify-center h-full gap-3">
                <img src={success} className="object-cover rounded-lg" />
                <div className="flex flex-col items-center">
                  <h3 className="text-3xl font-bold text-primary">
                    Payment Success
                  </h3>
                  <h5 className="text-base">
                    Congrats on your reserved parking space
                  </h5>
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{ backgroundImage: `url(${failBg})` }}
              className="bg-cover bg-center h-screen w-full"
            >
              <div className="flex flex-col items-center justify-center h-full gap-3">
                <img src={fail} className="object-cover rounded-lg" />
                <div className="flex flex-col items-center">
                  <h3 className="text-3xl font-bold text-[#CD281D]">
                    Payment Unsuccessful
                  </h3>
                  <h5 className="text-base">
                    Sorry, there was an issue. Please try again.
                  </h5>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;

const QRCode = ({ varient }) => {
  return (
    <div
      className={`${
        varient === "success" ? "bg-[#D3FFF6B2]" : "bg-[#CD281D0F]"
      } p-4 md:p-7 rounded-lg relative`}
    >
      <div className="absolute -top-11 left-[50%] transform -translate-x-1/2">
        {varient == "success" ? (
          <div className="w-[80px] h-[80px] bg-[#18BC9C] text-white flex justify-center items-center rounded-full border-[3px] border-[#fff]">
            <MdOutlineDone fontSize={55} fontWeight={600} />
          </div>
        ) : (
          <div className="w-[80px] h-[80px] bg-[#CD281D] text-white flex justify-center items-center rounded-full border-[3px] border-[#fff]">
            <TbSlash fontSize={55} fontWeight={600} />
          </div>
        )}
      </div>

      <div className="text-center my-4">
        {varient == "success" ? (
          <h3 className="text-xl md:text-3xl font-[500]">Thank you!</h3>
        ) : (
          <h3 className="text-xl md:text-3xl font-[500] text-[#CD281D]">
            Payment Declined!
          </h3>
        )}
      </div>
      <div className="border-t-[3px] border-dashed border-[#A8ABAB]"></div>
      {varient == "success" ? (
        <div>
          <h6 className="my-4 text-base md:text-xl font-bold text-[#414141]">
            QR Code
          </h6>
          <img src={qrImg} alt="image" className="w-[190px] mx-auto" />
        </div>
      ) : (
        <div>
          <Heading heading="Car & Contact info" />
          <List list={{ title: "License plate", value: "LEX 4521" }} />
          <List list={{ title: "Phone Number", value: "+124356" }} />
          <List list={{ title: "E-mail", value: "john@gmail.com" }} />
          <Heading heading="Parking spot details" />
          <List list={{ title: "Floor", value: "LEX 4521" }} />
          <List
            list={{ title: "Date", value: "10 July 2024-12:00am to 06:00pm" }}
          />
          <List list={{ title: "Spot", value: "B-13" }} />
        </div>
      )}
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
      {varient == "success" ? (
        <div className="mt-4 md:mt-6 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-7">
          <Button
            text="Save"
            width="w-full md:w-[162px]"
            height="h-[45px] md:h-[55px]"
          />
          <Button
            text="Share"
            width="w-full md:w-[162px]"
            bg="bg-white hover:bg-primary hover:text-white"
            color="text-primary"
            height="h-[45px] md:h-[55px]"
          />
        </div>
      ) : (
        <div className="mt-4 md:mt-6 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-7">
          <Button
            text="book again"
            width="w-full md:w-[162px]"
            height="h-[45px] md:h-[55px]"
          />
          <Button
            text="change account"
            width="w-full md:w-[162px]"
            bg="bg-white hover:bg-primary hover:text-white"
            color="text-primary"
            height="h-[45px] md:h-[55px]"
          />
        </div>
      )}
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
const ModalList = ({ list, weight }) => {
  return (
    <div className="flex items-center justify-between">
      <h6
        className={`text-sm md:text-base ${
          weight ? weight : "font-bold"
        } text-[#414141]`}
      >
        {list?.title}
      </h6>
      <h6
        className={`text-sm md:text-base ${
          weight ? weight : "font-bold"
        } text-[#414141]`}
      >
        {list?.value}
      </h6>
    </div>
  );
};
