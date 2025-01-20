const Transaction = ({ transaction }) => {
  const maskCardNumber = (cardNumber) => {
    return cardNumber.slice(0, 7) + "*".repeat(cardNumber.length - 7);
  };
  return (
    <div className="flex flex-col sm:flex-row flex-wrap sm:items-center justify-between gap-4 py-2 border-b border-[#e5e5e5]">
      <div className="flex items-center gap-2">
        <img
          src="https://placehold.co/45x45"
          alt="image"
          className="size-[48px] rounded-full object-cover"
        />
        <div>
          <h6 className="text-sm md:text-base font-semibold text-[#414141] leading-none">
            Account title
          </h6>
          <h6 className="text-xs text-[#414141] font-semibold leading-none">
            {maskCardNumber(transaction?.accountNumber)}
          </h6>
          <p className="text-[8px] text-[#41414199] leading-none mt-[2px]">
            {transaction?.date}
          </p>
        </div>
      </div>
      <div
        className={`flex justify-center px-2 py-1 rounded-full text-[10px] font-semibold ${
          transaction?.status === "Pending"
            ? "text-white bg-primary"
            : "bg-[#18BC9C24] border text-primary"
        }`}
      >
        {transaction?.status}
      </div>
      <p className="text-[10px] font-bold text-[#414141] flex justify-end">
        {transaction?.amount}
      </p>
    </div>
  );
};

export default Transaction;
