/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { HiOutlineDownload } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import getEnv from '../../../configs/config';
import axios from 'axios';

const Balance = ({ payments }) => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleConnectAccount = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${getEnv('SERVER_URL')}/api/payment/stripe/connect-url`, {
        withCredentials: true,
      });

      if (response.data?.success && response.data?.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Error fetching Stripe Connect URL:', error);
      alert('Failed to connect account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-[#2B2B2B33] rounded-[18px] p-4 shadow-md flex flex-col items-center">
      <div className="border-2 border-primary rounded-3xl py-4 px-6 flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <img
            src={user?.image?.url || 'https://placehold.co/64x64'}
            className="size-[64px] rounded-full object-cover"
          />
          <div>
            <h6 className="text-primary text-base md:text-xl font-semibold">
              {user?.firstName}-{user?.lastName}
            </h6>
            <p className="text-primary text-xs font-semibold">{user?.email}</p>
          </div>
        </div>
        <FaChevronDown fontSize={22} color="#18bc9c" />
      </div>
      <div className="flex items-center gap-6 justify-between">
        <div>
          <h6 className="my-4 md:my-6 text-[#414141] text-base md:text-lg font-bold">Pending Balance</h6>
          <h3 className="text-[#414141] text-2xl md:text-[35px] font-bold text-center">
            {payments?.data?.balance?.pending?.[0]?.amount / 100 || 0} $
          </h3>
        </div>
        <div>
          <h6 className="my-4 md:my-6 text-[#414141] text-base md:text-lg font-bold">Available Balance</h6>
          <h3 className="text-[#414141] text-2xl md:text-[35px] font-bold ">
            {payments?.data?.balance?.available?.[0]?.amount / 100 || 0} $
          </h3>
        </div>
      </div>

      {!user?.stripeAccountId && (
        <button
          onClick={handleConnectAccount}
          disabled={loading}
          className="mt-4 flex items-center justify-center gap-3 bg-primary rounded-[16px] p-4 w-[200px] text-sm font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading...' : 'Connect Account'}
          <HiOutlineDownload fontSize={20} color="#fff" />
        </button>
      )}
    </div>
  );
};

export default Balance;
