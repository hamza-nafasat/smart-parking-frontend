import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/shared/small/Button";
import { GoogleIcon } from "../../assets/svgs/Icon";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import AuthLayout from "./AuthLayout";
import Input from "../../components/shared/small/Input";

const ResetPassword = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const confirmPasswordVisibilityHandler = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };
  const passwordVisibilityHandler = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <AuthLayout>
      <div className="h-full flex flex-col justify-between">
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
            Reset new password
          </h6>
          <p className="mt-4 text-sm text-[#071A17CC] text-center">
            Enter New Password
          </p>
          <form className="mt-4 md:mt-6">
            <div className="relative my-4">
              <Input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
              />
              <div className="absolute top-1/2 -translate-y-1/2 right-4">
                {isPasswordVisible ? (
                  <VscEye
                    onClick={passwordVisibilityHandler}
                    className="text-[#949BA5] text-lg cursor-pointer"
                  />
                ) : (
                  <VscEyeClosed
                    onClick={passwordVisibilityHandler}
                    className="text-[#949BA5] text-lg cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div className="relative mb-4">
              <Input
                type={isConfirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
              />
              <div className="absolute top-1/2 -translate-y-1/2 right-4">
                {isConfirmPasswordVisible ? (
                  <VscEye
                    onClick={confirmPasswordVisibilityHandler}
                    className="text-[#949BA5] text-lg cursor-pointer"
                  />
                ) : (
                  <VscEyeClosed
                    onClick={confirmPasswordVisibilityHandler}
                    className="text-[#949BA5] text-lg cursor-pointer"
                  />
                )}
              </div>
            </div>
            <Button
              type="submit"
              text="Reset"
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

export default ResetPassword;
