import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { Link } from "react-router-dom";
import { GoogleIcon } from "../../assets/svgs/Icon";
import Button from "../../components/shared/small/Button";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Input from "../../components/shared/small/Input";
import { useRegisterMutation } from "../../redux/apis/authApis";
import toast from "react-hot-toast";

const SignUp = () => {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const confirmPasswordVisibilityHandler = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  const passwordVisibilityHandler = () => setIsPasswordVisible(!isPasswordVisible);

  const registerHandler = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.confirmPassword)
      return toast.error("Please Select All Fields");
    if (!form.password == form.confirmPassword) return toast.error("Password and Confirm Password does not match");
    try {
      const response = await registerUser(form).unwrap();
      toast.success(response?.message);
      setForm({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error?.data?.message);
      console.log("Error in registerHandler:", error);
    }
  };
  return (
    <AuthLayout>
      <div className="h-full flex flex-col justify-between">
        <div className="flex items-center justify-center gap-4">
          <Link to="/login" className="py-2 px-6 rounded-[10px] text-primary text-sm md:text-base">
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
          <h6 className="text-lg md:text-2xl font-bold text-[#414141]">Register</h6>
          <form className="mt-4 md:mt-6" onSubmit={registerHandler}>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Input
                type="text"
                placeholder="First name"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              />
              <Input
                type="text"
                placeholder="Last name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
            </div>
            <Input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <div className="relative my-4">
              <Input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <div className="absolute top-1/2 -translate-y-1/2 right-4">
                {isPasswordVisible ? (
                  <VscEye onClick={passwordVisibilityHandler} className="text-[#949BA5] text-lg cursor-pointer" />
                ) : (
                  <VscEyeClosed onClick={passwordVisibilityHandler} className="text-[#949BA5] text-lg cursor-pointer" />
                )}
              </div>
            </div>
            <div className="relative mb-4">
              <Input
                type={isConfirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
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
              className={`${isLoading ? "cursor-not-allowed pointer-events-none opacity-40" : ""}`}
            />
          </form>
        </div>
        <div className="mt-4 md:mt-8 flex flex-col justify-center items-center gap-4">
          <p className="text-sm md:text-base text-[#6C737F]">Or Continue with</p>
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
