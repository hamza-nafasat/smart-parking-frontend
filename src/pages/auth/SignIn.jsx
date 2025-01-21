import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/shared/small/Input";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import Button from "../../components/shared/small/Button";
import { GoogleIcon } from "../../assets/svgs/Icon";
import { useLoginMutation } from "../../redux/apis/authApis";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExist } from "../../redux/slices/authSlice";
import { areCookiesEnabled } from "../../utils/features";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loginUser, { isLoading }] = useLoginMutation();
  const passwordVisibilityHandler = () => setIsPasswordVisible(!isPasswordVisible);

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!areCookiesEnabled())
      return toast.error("Third Party Cookies are disabled! Enable them for a better experience.");
    if (!form.email || !form.password) return toast.error("Please Select Email and Password");
    try {
      const response = await loginUser(form).unwrap();
      toast.success(response?.message);
      setForm({ email: "", password: "" });
      await dispatch(userExist(response?.data));
      return navigate(`/${response?.data?.role?.toLowerCase()}`);
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
      console.log("Error in loginHandler:", error);
    }
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
          <Link to="/register" className="py-2 px-6 rounded-[10px] text-primary text-sm md:text-base">
            Register
          </Link>
        </div>
        <div className="mt-4 md:mt-6">
          <h6 className="text-lg md:text-2xl font-bold text-[#414141]">Sign in</h6>
          <form className="mt-4 md:mt-6" onSubmit={loginHandler}>
            <Input
              type="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <div className="relative my-4">
              <Input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter Password"
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
            <div className="text-right mb-4">
              <Link to="/forget-password" className="text-[#6C737F] text-sm md:text-base">
                Forgot Password?
              </Link>
            </div>
            <Button
              type="submit"
              text="Sign In"
              width="w-full"
              height="h-[45px] sm:h-[57px]"
              disabled={isLoading}
              className={`${isLoading ? " opacity-30 !cursor-not-allowed" : ""}`}
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
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
