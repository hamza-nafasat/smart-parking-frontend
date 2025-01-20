import React from "react";
import logo from "../../assets/images/logo.png";

const AuthLayout = ({ title, children }) => {
  return (
    <div className="w-full bg-[#F9FFFE] min-h-screen lg:bg-[url('/src/assets/images/auth/auth-bg.png')] bg-no-repeat bg-[length:55%] bg-left">
      <div className="container mx-auto grid grid-cols-12 gap-4 min-h-screen py-8 md:py-14 px-4">
        <div className="hidden lg:block lg:col-span-7">
          <div className="flex items-center gap-[2px]" href="/">
            <img src={logo} alt="" className="w-[60px]" />
            <h6 className="text-base sm:text-lg md:text-xl text-white font-extrabold italic !leading-none">
              Smart <br /> Parking
            </h6>
          </div>
          <div className="mt-8">
            <h4 className="text-primary text-[54px] font-bold">Welcome!</h4>
            <p className="mt-4 text-white text-2xl font-medium">
              Sign In to Digital Car Parking Passport
            </p>
            <p className="text-white text-lg w-[55%] mt-2">
              It is a long established fact that a reader will be distracted by
              the readable content of a page.
            </p>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
