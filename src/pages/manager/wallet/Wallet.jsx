import CustomAreaChart from '../../../components/charts/CustomAreaChart';
import Balance from '../../../components/shared/large/Balance';
import EarningCard from '../../../components/shared/large/EarningCard';
import { useGetAllPaymentsWithMyAccountQuery } from '../../../redux/apis/paymentApis';
import TransactionsList from '../../admin/wallet/components/TransactionsList';

const earningsData = [
  { name: '02 july', uv: 4566.0 },
  { name: '03 july', uv: 3566.0 },
  { name: '05 july', uv: 2566.0 },
  { name: '11 july', uv: 3455.0 },
  { name: '12 july', uv: 3455.0 },
  { name: '15 july', uv: 4455.0 },
  { name: '16 july', uv: 2233.0 },
  { name: '17 july', uv: 1122.0 },
  { name: '19 july', uv: 2222.0 },
  { name: '21 july', uv: 3333.0 },
  { name: '24 july', uv: 1111.0 },
  { name: '24 july', uv: 3333.0 },
  { name: '25 july', uv: 1323.0 },
  { name: '26 july', uv: 6666.0 },
];
const Wallet = () => {
  const { data } = useGetAllPaymentsWithMyAccountQuery();
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-8 ">
        <EarningCard earning={data?.data?.todayBalance / 100 || 0} booking={data?.data?.todayBookings || 0} />
        <div className="bg-white rounded-lg border-[1px] shadow-lg mt-4 flex-1">
          <div className="flex items-center justify-between p-4">
            <h3 className="font-bold text-base">Earnings Overview</h3>
            <select className="border border-[#82828299] py-1 px-[6px] rounded-md outline-none text-[#071A17CC] font-medium text-xs">
              <option value="Weekly" className="text-xs text-[#071A17CC]">
                Weekly
              </option>
              <option value="Monthly" className="text-xs text-[#071A17CC]">
                Monthly
              </option>
              <option value="Yearly" className="text-xs text-[#071A17CC]">
                Yearly
              </option>
            </select>
          </div>
          <CustomAreaChart data={earningsData} strokeWidth={4} height={480} />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4">
        <Balance payments={data} balance={100000} />
        <div className="mt-4">
          <TransactionsList height="h-[470px]" />
        </div>
      </div>
    </div>
  );
};

export default Wallet;

{
  /* <div className=" w-full bg-white rounded-lg border-[1px] shadow-lg mt-4 p-4 ">
          <div className="">
            <AccountDetails />
          </div>
        </div> */
}
