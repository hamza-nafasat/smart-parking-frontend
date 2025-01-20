import React from "react";
import { GreenAdd, GreenEdit, RedDelete } from "../../../../assets/svgs/Icon";

const AccountDetails = () => {
  return (
    <div>
      <div className="flex justify-between items-center pb-3 border-b-[2px]">
        <h4 className="font-[700] text-base">Account Details</h4>
        <GreenAdd />
      </div>
      <div>
        <SingleAccount />
        <SingleAccount />
        <SingleAccount />
      </div>
    </div>
  );
};

export default AccountDetails;

const SingleAccount = () => {
  return (
    <div className="flex flex-col-reverse  md:flex-row justify-between w-full border-b-[1px] py-3 ">
      <div className="flex gap-5">
        <img
          src="https://placehold.co/98x70"
          alt="image"
          className=" rounded-lg object-cover"
        />
        <div>
          <h4 className="font-[600] text-sm md:text-base">
            Saudi National Bank(SNB)
          </h4>
          <p className="text-[#414141] text-sm ">Jhons Ac title</p>
          <p className="text-[#414141] text-sm ">Account ******</p>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <div className="flex gap-3 items-center">
          <GreenEdit />
          <RedDelete />
        </div>
        <p className="text-[#414141] text-sm ">Company Account</p>
      </div>
    </div>
  );
};
