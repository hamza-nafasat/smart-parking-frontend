import React from "react";
import AuthLayout from "./AuthLayout";
import { Link } from "react-router-dom";
import Input from "../../components/shared/small/Input";
import { GoogleIcon } from "../../assets/svgs/Icon";
import Button from "../../components/shared/small/Button";
const ForgetPassword = () => {
  return (
    <AuthLayout>
      <div className="h-full flex flex-col justify-around">
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/login"
            className="border border-[#E0E0E9] py-2 px-6 rounded-[10px] text-primary text-sm md:text-base font-bold"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="py-2 px-6 rounded-[10px] text-primary text-sm md:text-base"
          >
            Register
          </Link>
        </div>
        <div className="mt-4 md:mt-6">
          <h6 className="text-lg md:text-2xl font-bold text-[#414141]">
          Forgot Password 
          </h6>
          <p className="my-4 text-sm text-[#071A17CC]">
            Enter your email and we will send you a link to reset your password
          </p>
          <form className="mt-4 md:mt-6">
            <div className="mb-4">
              <Input type="email" placeholder="Enter Email" />
            </div>
            <Button
              type="submit"
              text="Continue"
              width="w-full"
              height="h-[45px] sm:h-[57px]"
            />
          </form>
        </div>
        <div className="mt-4 md:mt-8 flex justify-center gap-4">
          <p className="text-sm text-[#071A17E5]">New User?</p>
          <Link to="/register" className="text-sm text-primary font-bold">
            Signup
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgetPassword;
