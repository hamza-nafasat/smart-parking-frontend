import { IoAddSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const AddParking = () => {
  return (
    <Link to="/manager/add-parking-space" className="bg-[#18BC9C05] block w-full sm:w-[320px] h-[204px] rounded-[10px] shadow-md bg-[url('/src/assets/images/add-space.png')] bg-contain bg-no-repeat bg-right px-4 py-[18px] relative">
      <h4 className="text-lg text-[#414141] font-semibold">Add Parking Space</h4>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <IoAddSharp fontSize={100} fontWeight={700} className="text-primary" />
      </div>
    </Link>
  )
}

export default AddParking