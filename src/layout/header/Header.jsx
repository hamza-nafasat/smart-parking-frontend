import { useEffect, useRef, useState } from "react";
import { IoChevronForwardOutline, IoLogOutOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  RingIcon,
  HeaderChevronIcon,
  HamburgerIcon,
  BuildingIcon,
  BookedIcon,
  FreeSlotsIcon,
} from "../../assets/svgs/Icon";
import Aside from "../aside/Aside";
import Notification from "./Notification";
import { useLogoutMutation } from "../../redux/apis/authApis";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userNotExist } from "../../redux/slices/authSlice";

const Header = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const notificationRef = useRef();
  const profileRef = useRef();
  const { pathname } = useLocation();
  const pathSplit = pathname.split("/");
  const page = pathSplit[pathSplit.length - 1];
  const pageName = page.split("-").join(" ");

  const mobileNavHandler = () => setMobileNav(!mobileNav);

  const notificationOpenHandler = (e) => {
    setIsNotificationOpen(!isNotificationOpen);
    if (profileRef.current && notificationRef.current.contains(e.target)) {
      setIsProfileOpen(false);
    }
  };

  const profileOpenHandler = (e) => {
    setIsProfileOpen(!isProfileOpen);
    if (notificationRef.current && profileRef.current.contains(e.target)) {
      setIsNotificationOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target) &&
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setIsNotificationOpen(false);
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [notificationRef, profileRef]);

  return (
    <header className="h-[220px] sm:h-[180px] p-4 flex flex-col justify-between gap-6">
      <div className="flex items-center justify-between gap-6">
        <div>
          <div className="bg-primary p-2 rounded-md cursor-pointer block xl:hidden" onClick={mobileNavHandler}>
            <HamburgerIcon />
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 xl:gap-6">
          <div className="relative">
            <div className="cursor-pointer" onClick={notificationOpenHandler} ref={notificationRef}>
              <RingIcon />
              <p className="absolute top-1 left-[-4px] text-[8px] font-light text-white bg-[#FD4B2E] w-3 h-3 rounded-full grid place-items-center">
                9
              </p>
            </div>
            <div
              className={`absolute top-[35px] right-0 z-[1000] w-[320px] overflow-y-scroll border-2 border-[#e4e4e43b] shadow-md bg-white rounded-lg custom-scroll transition-all duration-700 ${
                isNotificationOpen ? "h-[300px] opacity-100" : "h-0 invisible opacity-0"
              }`}
            >
              <Notification />
            </div>
          </div>
          <div className="bg-[#FFFFFF80] py-2 px-5 rounded-lg flex items-center justify-center gap-2 relative">
            <img
              src="https://placehold.co/600x400/white/18bc9c?text=AZ"
              alt="image"
              className="w-6 h-6 rounded-full object-cover"
            />
            <div
              className="flex items-center gap-2 text-white text-xs font-semibold cursor-pointer"
              onClick={profileOpenHandler}
              ref={profileRef}
            >
              MKS
              <div className={`transition-all duration-400 ${isProfileOpen ? "rotate-180" : "rotate-0"}`}>
                <HeaderChevronIcon />
              </div>
            </div>
            <div
              onClick={profileOpenHandler}
              className={`absolute top-[45px] right-0 border-2 border-[#e4e4e43b] w-[150px] shadow-md rounded-lg custom-scroll transition-all duration-400 ${
                isProfileOpen ? "h-[76px] opacity-100" : "h-0 invisible opacity-0"
              }`}
            >
              <Profile />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <h2 className="text-lg md:text-2xl text-white font-semibold capitalize basis-[30%]">
          {["admin", "manager", "user"].includes(pageName) ? "Dashboard" : pageName}
        </h2>
        <HeaderData />
      </div>
      <div
        className={`block xl:hidden fixed w-full h-full inset-0 bg-[#00000071] z-50 transition-all duration-500 ${
          mobileNav ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileNav(false)}
      >
        <div
          className={`absolute top-3 left-3 h-full transition-transform duration-500 ${
            mobileNav ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Aside />
        </div>
      </div>
    </header>
  );
};

export default Header;

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      const res = await logout().unwrap();
      toast.success(res?.message);
      await dispatch(userNotExist());
      return navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message);
      console.log("error in logout handler", error);
    }
  };
  return (
    <div className="w-full">
      <Link
        to="profile"
        className="flex items-center justify-between gap-4 px-2 py-2 border-b bg-white rounded-t-md hover:bg-[#b6feef]"
      >
        <h6 className="text-[13px] font-medium">My Profile</h6>
        <IoChevronForwardOutline fontSize={18} />
      </Link>
      <div
        className={`flex items-center justify-between gap-4 px-2 py-2 cursor-pointer bg-white rounded-b-md hover:bg-[#b6feef] ${
          isLoading && "cursor-not-allowed pointer-events-none opacity-50"
        }`}
      >
        <h6 className={`text-[13px] font-medium `} onClick={logoutHandler}>
          Logout
        </h6>
        <IoLogOutOutline fontSize={18} />
      </div>
    </div>
  );
};

const HeaderData = () => {
  return (
    <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 md:gap-8 bg-[#FFFFFFCC] rounded-lg py-2 px-4">
      <div className="flex items-center gap-1">
        <BuildingIcon />
        <h6 className="text-[10px] sm:text-sm font-medium text-[#414141]">
          Total Number of Parking Slots: <span className="font-bold">1204</span>
        </h6>
      </div>
      <div className="flex items-center gap-1">
        <BookedIcon />
        <h6 className="text-[10px] sm:text-sm font-medium text-[#414141]">
          Booked: <span className="font-bold">440</span>
        </h6>
      </div>
      <div className="flex items-center gap-1">
        <FreeSlotsIcon />
        <h6 className="text-[10px] sm:text-sm font-medium text-[#414141]">
          Free Slots: <span className="font-bold">1204</span>
        </h6>
      </div>
    </div>
  );
};
