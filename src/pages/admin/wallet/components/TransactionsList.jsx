/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import Transaction from '../../../../components/shared/large/Transaction';
import Button from '../../../../components/shared/small/Button';
import { useGetAllPaymentsWithMyAccountQuery } from '../../../../redux/apis/paymentApis';

const TransactionsList = ({ listData, height }) => {
  const { data: payments } = useGetAllPaymentsWithMyAccountQuery();

  console.log('data of payments', payments);
  const navigate = useNavigate();
  return (
    <div
      className={`bg-white border border-[#2B2B2B33] rounded-[18px] p-4 shadow-md ${
        height ? height : 'h-[400px]'
      } overflow-y-scroll custom-scroll`}
    >
      <div className="flex items-center justify-between gap-4 pb-4">
        <h4 className="text-base font-bold text-[#414141]">Transactions</h4>
        <div className="flex items-center gap-3">
          <button className="border border-[#9E9E9E] rounded-md py-1 px-2 text-xs text-[#5c5c5c] font-semibold">
            Newest
          </button>
          <button className="border border-[#9E9E9E] rounded-md py-1 px-2 text-xs text-[#5c5c5c] font-semibold">
            Oldest
          </button>
        </div>
      </div>
      <div className="mt-3">
        {listData.map((transaction, i) => (
          <Transaction key={i} transaction={transaction} />
        ))}
      </div>
      <div className="mt-4">
        <Button text="See more" width="w-full" onClick={() => navigate('/admin/wallet-transactions-detail')} />
      </div>
    </div>
  );
};

export default TransactionsList;
