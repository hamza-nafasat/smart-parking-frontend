import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { HiOutlineDownload } from "react-icons/hi";
import Modal from "../small/Modal";
import Dropdown from "../small/Dropdown";
import Input from '../small/Input'
import Button from "../small/Button";

const Balance = ({ balance }) => {
  const [modal, setModal] = useState(false);
  const openModalHandler = () => setModal(true);
  const closeModalHandler = () => setModal(false);
  return (
    <div className="bg-white border border-[#2B2B2B33] rounded-[18px] p-4 shadow-md flex flex-col items-center">
      <div className="border-2 border-primary rounded-3xl py-4 px-6 flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <img
            src="https://placehold.co/64x64"
            className="size-[64px] rounded-full object-cover"
          />
          <div>
            <h6 className="text-primary text-base md:text-xl font-semibold">
              ----MKS----
            </h6>
            <p className="text-primary text-xs font-semibold">
              mks23sss@gmail.com
            </p>
          </div>
        </div>
        <FaChevronDown fontSize={22} color="#18bc9c" />
      </div>
      <h6 className="my-4 md:my-6 text-[#414141] text-base md:text-lg font-bold">
        Total Balance
      </h6>
      <h2 className="text-[#414141] text-2xl md:text-[42px] font-bold">
        $ {balance}
      </h2>
      <button
        onClick={openModalHandler}
        className="mt-4 flex items-center justify-center gap-3 bg-primary rounded-[16px] p-4 w-[143px] text-sm font-bold text-white"
      >
        Withdraw
        <HiOutlineDownload fontSize={20} color="#fff" />
      </button>
      {modal && (
        <Modal
          title="Withdraw"
          onClose={closeModalHandler}
          width="w-[300px] sm:w-[400px] md:w-[650px]"
        >
          <Withdraw onClose={closeModalHandler} />
        </Modal>
      )}
    </div>
  );
};

export default Balance;

const Withdraw = ({amount, onClose}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Dropdown
          defaultText="Country Name"
          options={[
            { option: "Primary", value: "primary" },
            { option: "Secondary", value: "secondary" },
          ]}
        />
      </div>
      <div>
        <Input type="text" placeholder="Enter account" />
      </div>
      <div className="md:col-span-2 flex items-center justify-between">
        <h5 className="text-sm md:text-base font-semibold text-[#414141]">Withdraw Amount</h5>
        <h5 className="text-sm md:text-base font-semibold text-[#414141]">10 USD</h5>
      </div>
      <div className="md:col-span-2 flex flex-col items-center gap-4 justify-center mt-4">
        <Button text='WITHDRAWAL' width='w-[145px]' />
        <button onClick={onClose} className="text-primary hover:text-[#414141] text-sm font-semibold">Dismiss</button>
      </div>
    </div>
  );
};
