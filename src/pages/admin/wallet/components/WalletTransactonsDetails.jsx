import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { CiSearch } from "react-icons/ci";
import { walletColumns, walletData } from "./TransactionDetailColumns";
import { tableStyles } from "../../../../components/shared/small/dataTableStyles";
import Modal from "../../../../components/shared/small/Modal";
import Button from "../../../../components/shared/small/Button";

const WalletTransactonsDetails = () => {
  const [modal, setModal] = useState(false);

  const modalOpenHandler = () => setModal(true);
  const modalCloseHandler = () => setModal(false);
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm md:text-base font-bold text-[#414141]">
          Today Parking Booking Summary
        </h3>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-[#F9FBFF] border border-[#e7e7e7] rounded-[10px] py-2 px-4">
            <CiSearch fontSize={20} color="#7E7E7E" />
            <input
              type="text"
              placeholder="Search"
              className="w-full text-xs md:text-base bg-transparent border-none focus:outline-none text-[#7E7E7E]"
            />
          </div>
          <div className="flex items-center gap-2 bg-[#F9FBFF] border border-[#e7e7e7] rounded-[10px] py-2 px-4">
            <p className="text-xs md:text-base text-[#7E7E7E] text-nowrap">
              Short by:
            </p>
            <select className="w-full bg-transparent border-none focus:outline-none text-xs md:text-base text-[#3D3C42]">
              <option value="">Newest</option>
              <option value="">Older</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-4 md:mt-6">
        <DataTable
          columns={walletColumns(modalOpenHandler)}
          data={walletData}
          customStyles={tableStyles}
          pagination
        />
      </div>
      {modal && (
        <Modal
          title="Slip"
          onClose={modalCloseHandler}
          width="w-[320px] md:w-[630px]"
        >
          <SlipModal />
        </Modal>
      )}
    </div>
  );
};

export default WalletTransactonsDetails;

const SlipModal = ({ data }) => {
  return (
    <div>
      <ModalList list={{ title: "TID", value: "032150" }} />
      <ModalList list={{ title: "From." }} />
      <ModalList
        list={{ title: "Account Title", value: "Asif Zulfiqar" }}
        size="text-base"
        weight="font-semibold"
      />
      <ModalList
        list={{ title: "Account Number", value: "1211 4534 3453" }}
        size="text-base"
        weight="font-semibold"
      />
      <ModalList
        list={{ title: "Amount", value: "$4215" }}
        size="text-base"
        weight="font-semibold"
      />
      <div className="border-t-[3px] border-dashed border-[#A8ABAB] my-4"></div>
      <ModalList list={{ title: "To." }} />
      <ModalList
        list={{ title: "Account Title", value: "Asif Zulfiqar" }}
        size="text-base"
        weight="font-semibold"
      />
      <ModalList
        list={{ title: "Account Number", value: "1211 4534 3453" }}
        size="text-base"
        weight="font-semibold"
      />
      <ModalList
        list={{ title: "Amount", value: "$4215" }}
        size="text-base"
        weight="font-semibold"
      />
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

const ModalList = ({ list, weight, size }) => {
  return (
    <div className="flex items-center justify-between">
      <h6
        className={`${size ? size : "text-base"} ${
          weight ? weight : "font-bold"
        } text-[#414141]`}
      >
        {list?.title}
      </h6>
      <h6
        className={`${size ? size : "text-base"} ${
          weight ? weight : "font-bold"
        } text-[#414141]`}
      >
        {list?.value}
      </h6>
    </div>
  );
};
