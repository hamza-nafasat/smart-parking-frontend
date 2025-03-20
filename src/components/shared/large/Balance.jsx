/* eslint-disable react/prop-types */
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaChevronDown } from 'react-icons/fa';
import { HiOutlineDownload } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import getEnv from '../../../configs/config';
import { useGetAllPaymentsWithMyAccountQuery, useWithDrawAmountMutation } from '../../../redux/apis/paymentApis';
import Button from '../small/Button';
import Input from '../small/Input';
import Modal from '../small/Modal';

const Balance = () => {
  const { user } = useSelector((state) => state.auth);
  const [modal, setModal] = useState(false);
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
        {payments?.data?.balance?.pending?.[0]?.amount / 100} $
      </h2>

      {user?.stripeAccountId ? (
        <button
          onClick={() => setModal(true)}
          className="mt-4 flex items-center justify-center gap-3 bg-primary rounded-[16px] p-4 w-[143px] text-sm font-bold text-white"
        >
          Withdraw
          <HiOutlineDownload fontSize={20} color="#fff" />
        </button>
      ) : (
        <a
          href={stripeConnectUrl}
          className="mt-4 flex items-center justify-center gap-3 bg-primary rounded-[16px] p-4 w-[200px] text-sm font-bold text-white"
        >
          Connect Account
          <HiOutlineDownload fontSize={20} color="#fff" />
        </a>
      )}

      {modal && (
        <Modal title="Withdraw" onClose={() => setModal(false)} width="w-[300px] sm:w-[400px] md:w-[650px]">
          <Withdraw onClose={() => setModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Balance;

const Withdraw = ({ onClose }) => {
  const [amount, setAmount] = useState(0);
  const [withDrawAmount] = useWithDrawAmountMutation();

  const withDrawAmountHandler = async (amount) => {
    try {
      if (!amount) return toast.error('Amount is required');
      const res = await withDrawAmount({ amount }).unwrap();
      console.log('res', res);
    } catch (error) {
      toast.error('Insufficient balance');
      console.log(error);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Input type="number" placeholder="Enter account" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div className="md:col-span-2 flex items-center justify-between">
        <h5 className="text-sm md:text-base font-semibold text-[#414141]">Withdraw Amount</h5>
        <h5 className="text-sm md:text-base font-semibold text-[#414141]">10 USD</h5>
      </div>
      <div className="md:col-span-2 flex flex-col items-center gap-4 justify-center mt-4">
        <Button onClick={() => withDrawAmountHandler(amount)} text="WITHDRAWAL" width="w-[145px]" />
        <button onClick={onClose} className="text-primary hover:text-[#414141] text-sm font-semibold">
          Dismiss
        </button>
      </div>
    </div>
  );
};
