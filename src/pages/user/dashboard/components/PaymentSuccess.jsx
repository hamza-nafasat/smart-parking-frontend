import React, { useState } from "react";
import { BackIcon, PinIcon, T20for7Icon } from "../../../../assets/svgs/Icon";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/shared/small/Button";
import slotsImg from "../../../../assets/images/default/slots.png";
import qrImg from "../../../../assets/images/default/qr.png";
import Modal from "../../../../components/shared/small/Modal";
import Payment from "./Payment";

const PaymentSuccess = () => {
  return (
    <div>
      <Payment varient="success" />
    </div>
  );
};

export default PaymentSuccess;
