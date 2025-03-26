import { FaChevronDown } from 'react-icons/fa';
import { HiOutlineDownload } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import getEnv from '../../../configs/config';
import { useGetAllPaymentsWithMyAccountQuery } from '../../../redux/apis/paymentApis';

const Balance = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: payments } = useGetAllPaymentsWithMyAccountQuery();
  const redirectUri = encodeURIComponent(`${getEnv('SERVER_URL')}/api/payment/stripe/oauth/callback`);
  const stripeConnectUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${getEnv(
    'STRIPE_CONNECT_CLIENT_ID'
  )}&scope=read_write&redirect_uri=${redirectUri}&state=${user?._id}`;
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
      <h6 className="my-4 md:my-6 text-[#414141] text-base md:text-lg font-bold">Total Balance</h6>
      <h2 className="text-[#414141] text-2xl md:text-[42px] font-bold">
        {payments?.data?.balance?.available?.[0]?.amount / 100} $
      </h2>

      {!user?.stripeAccountId && (
        <a
          href={stripeConnectUrl}
          className="mt-4 flex items-center justify-center gap-3 bg-primary rounded-[16px] p-4 w-[200px] text-sm font-bold text-white"
        >
          Connect Account
          <HiOutlineDownload fontSize={20} color="#fff" />
        </a>
      )}
    </div>
  );
};

export default Balance;
