import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "./components/shared/small/Loader";
import FloorView from "./pages/admin/buildingInfo/components/FloorView";
import Booking from "./pages/user/dashboard/components/Booking";
import ConfirmBooking from "./pages/user/dashboard/components/ConfirmBooking";
import PaymentSuccess from "./pages/user/dashboard/components/PaymentSuccess";
import PaymentFail from "./pages/user/dashboard/components/PaymentFail";
import UserViewSlip from "./pages/user/bookingSummary/components/ViewSlip";
import UserProfile from "./pages/user/setting/Profile";
import BookingSlots from "./pages/user/dashboard/components/BookingSlots";
import { Toaster } from "react-hot-toast";
import { useCheckLoginMutation } from "./redux/apis/authApis";
import { useDispatch } from "react-redux";
import { userExist, userNotExist } from "./redux/slices/authSlice";
import ProtectedRoutes from "./components/ProtectedRoutes";
import "react-confirm-alert/src/react-confirm-alert.css";

const LandingPage = lazy(() => import("./pages/landing/LandingPage"));
// auth imports
const SignIn = lazy(() => import("./pages/auth/SignIn"));
const SignUp = lazy(() => import("./pages/auth/SignUp"));
const ForgetPassword = lazy(() => import("./pages/auth/ForgetPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
// admin imports
const Admin = lazy(() => import("./pages/admin/index"));
const AdminDashboard = lazy(() => import("./pages/admin/dashboard/AdminDashboard"));
const BuildingInfo = lazy(() => import("./pages/admin/buildingInfo/BuildingInfo"));
const ParkingSummary = lazy(() => import("./pages/admin/parkingSummary/ParkingSummary"));
const Wallet = lazy(() => import("./pages/admin/wallet/Wallet"));
const ViewSlipAdmin = lazy(() => import("./pages/admin/dashboard/components/ViewSlip"));
const WalletTransactionsDetail = lazy(() => import("./pages/admin/wallet/components/WalletTransactonsDetails"));
const BuildingView = lazy(() => import("./pages/admin/buildingInfo/components/BuildingView"));
// Manager imports
const Manager = lazy(() => import("./pages/manager/index"));
const ManagerDashboard = lazy(() => import("./pages/manager/dashboard/ManagerDashboard"));
const ManagerBuildingInfo = lazy(() => import("./pages/manager/buildingInfo/BuildingInfo"));
const ManagerBuildingView = lazy(() => import("./pages/manager/buildingInfo/components/BuildingView"));
const ManagerFloorView = lazy(() => import("./pages/manager/buildingInfo/components/FloorView"));
const ManagerParkingSummary = lazy(() => import("./pages/manager/parkingSummary/ParkingSummary"));
const ManagerWallet = lazy(() => import("./pages/manager/wallet/Wallet"));
const ManagerProfile = lazy(() => import("./pages/manager/settings/Profile"));
const AddParking = lazy(() => import("./pages/manager/addParkingSpace/components/AddParking"))
const Sensors = lazy(() => import("./pages/manager/sensors/Sensors"))
// User imports
const User = lazy(() => import("./pages/user/index"));
const UserDashboard = lazy(() => import("./pages/user/dashboard/UserDashboard"));
const BookingSummary = lazy(() => import("./pages/user/bookingSummary/BookingSummary"));
const UserBuildingInfo = lazy(() => import("./pages/user/buildingInfo/BuildingInfo"));
const AddParkingSpace = lazy(() => import("./pages/manager/addParkingSpace/AddParkingSpace"));

function App() {
  const dispatch = useDispatch();
  const [checkLogin] = useCheckLoginMutation();
  const [isLoading, setIsLoading] = useState(true);

  const checkUserLogin = useCallback(async () => {
    try {
      const res = await checkLogin().unwrap();
      if (res) dispatch(userExist(res?.data));
    } catch (error) {
      console.log("Error while checking user login", error);
      dispatch(userNotExist());
    } finally {
      setIsLoading(false);
    }
  }, [checkLogin, dispatch]);

  useEffect(() => {
    checkUserLogin();
  }, [checkUserLogin]);
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        {isLoading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/login" element={<SignIn />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Route>

            <Route element={<ProtectedRoutes requiresAuth role={"admin"} />}>
              <Route path="/admin" element={<Admin />}>
                <Route index element={<AdminDashboard />} />
                <Route path="building-info" element={<BuildingInfo />} />
                <Route path="building-view/:id" element={<BuildingView />} />
                <Route path="floor-view/:id" element={<FloorView />} />
                <Route path="parking-summary" element={<ParkingSummary />} />
                <Route path="wallet" element={<Wallet />} />
                <Route path="wallet-transactions-detail" element={<WalletTransactionsDetail />} />
                <Route path="view-slip/:id" element={<ViewSlipAdmin />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoutes requiresAuth role={"manager"} />}>
              <Route path="/manager" element={<Manager />}>
                <Route index element={<ManagerDashboard />} />
                <Route path="building-info" element={<ManagerBuildingInfo />} />
                <Route path="building-view/:id" element={<ManagerBuildingView />} />
                <Route path="floor-view/:id" element={<ManagerFloorView />} />
                <Route path="parking-summary" element={<ManagerParkingSummary />} />
                <Route path="sensors" element={<Sensors />} />
                <Route path="wallet" element={<ManagerWallet />} />
                <Route path="profile" element={<ManagerProfile />} />
                <Route path="profile" element={<ManagerProfile />} />
                <Route path="add-parking-space" element={<AddParkingSpace />} />
                <Route path="add-parking" element={<AddParking />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoutes requiresAuth role={"user"} />}>
              <Route path="/user" element={<User />}>
                <Route index element={<UserDashboard />} />
                <Route path="building-info" element={<UserBuildingInfo />} />
                <Route path="booking-summary" element={<BookingSummary />} />
                <Route path="view-slip" element={<UserViewSlip />} />
                <Route path="booking" element={<Booking />} />
                <Route path="confirm-booking" element={<ConfirmBooking />} />
                <Route path="payment-success" element={<PaymentSuccess />} />
                <Route path="payment-failed" element={<PaymentFail />} />
                <Route path="booking-slot" element={<BookingSlots />} />
                <Route path="profile" element={<UserProfile />} />
              </Route>
            </Route>
          </Routes>
        )}
      </Suspense>
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
    </BrowserRouter>
  );
}

export default App;
