import React, { useState } from "react";
import AuthLayout from "./AuthLayout";
import { Link } from "react-router-dom";
import { GoogleIcon } from "../../assets/svgs/Icon";
import Button from "../../components/shared/small/Button";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Input from "../../components/shared/small/Input";

const SignUp = () => {
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
            className="py-2 px-6 rounded-[10px] text-primary text-sm md:text-base"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="border border-[#E0E0E9] py-2 px-6 rounded-[10px] font-bold text-primary text-sm md:text-base"
          >
            Register
          </Link>
        </div>
        <div className="mt-4 md:mt-6">
          <h6 className="text-lg md:text-2xl font-bold text-[#414141]">
            Register
          </h6>
          <form className="mt-4 md:mt-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Input type="text" placeholder="First name" />
              <Input type="text" placeholder="Last name" />
            </div>
            <Input type="email" placeholder="Email" />
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
              text="Register"
              width="w-full"
              height="h-[45px] sm:h-[57px]"
            />
          </form>
        </div>
        <div className="mt-4 md:mt-8 flex flex-col justify-center items-center gap-4">
          <p className="text-sm md:text-base text-[#6C737F]">
            Or Continue with
          </p>
          <div
            className="border border-[#E0E0E9] p-3 md:p-5 rounded-[15px] cursor-pointer"
            style={{ boxShadow: "0px 4px 12px 0px #18BC9C0F" }}
          >
            <GoogleIcon />
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-[#071A17E5]">Already have an account?</p>
            <Link to="/login" className="text-sm text-primary font-bold">
              Login
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
