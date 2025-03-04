/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AccordionEditIcon } from "../../../../assets/svgs/Icon";
import useFetchAndMakeSensorSlice from "../../../../components/hooks/useFetchAndMakeSensorSlice";
import Button from "../../../../components/shared/small/Button";
import { useCreateBuildingMutation } from "../../../../redux/apis/buildingApis";
import { useCreateFloorsInBulkMutation } from "../../../../redux/apis/floorApis";
import { useCreateSlotsInBulkMutation } from "../../../../redux/apis/slotApis";
import { resetBuildings } from "../../../../redux/slices/buildingSlice";
import { resetFloors, setActiveAccordionIndex } from "../../../../redux/slices/floorSlice";
import { customObjectId } from "../../../../utils/features";
import { floors as sensors } from "../utils/addParkingSpaceFeatures";

const Confirmation = ({ setCurrentStep }) => {
  const dispatch = useDispatch();
  const { buildingGeneralInfo } = useSelector((state) => state.building);

  const { refetchHook } = useFetchAndMakeSensorSlice();

  const { floors } = useSelector((state) => state.floor);
  const [createBuilding, { isLoading }] = useCreateBuildingMutation();
  const [createFloorInBulk, { isLoading: isLoadingForFloor }] = useCreateFloorsInBulkMutation();
  const [createSlotsInBulk, { isLoading: isLoadingForSlots }] = useCreateSlotsInBulkMutation();

  // final submit handler which create building and floors in database
  // -----------------------------------------------------------------
  const stepperSubmitHandler = async () => {
    let gettedBuildingId = customObjectId();
    try {
      // create building in database
      let data = {
        name: buildingGeneralInfo?.name || "",
        address: buildingGeneralInfo?.address || "",
        area: buildingGeneralInfo?.area || "",
        noOfFloors: buildingGeneralInfo?.noOfFloors || "",
        email: buildingGeneralInfo?.email || "",
        description: buildingGeneralInfo?.description || "",
        type: buildingGeneralInfo?.type || "",
        file: buildingGeneralInfo?.file || "",
        longitude: buildingGeneralInfo?.longitude || "",
        latitude: buildingGeneralInfo?.latitude || "",
        polygonData: buildingGeneralInfo?.buildingCoordinates || "",
      };
      const { name, address, area, email, description, type, file, polygonData, noOfFloors, longitude, latitude } =
        data;
      if (
        !name ||
        !address ||
        !area ||
        !email ||
        !description ||
        !type ||
        !file ||
        !polygonData ||
        !noOfFloors ||
        !longitude ||
        !latitude
      )
        return toast.error("Please Fill all required fields for building");
      const formDataForBuilding = new FormData();
      const formDataForFloor = new FormData();
      const allSlotsFormData = [];
      // create form data for building ===>
      formDataForBuilding.append("_id", gettedBuildingId);
      formDataForBuilding.append("name", name);
      formDataForBuilding.append("address", address);
      formDataForBuilding.append("area", area);
      formDataForBuilding.append("email", email);
      formDataForBuilding.append("description", description);
      formDataForBuilding.append("type", type);
      formDataForBuilding.append("longitude", longitude);
      formDataForBuilding.append("latitude", latitude);
      formDataForBuilding.append("noOfFloors", noOfFloors);
      formDataForBuilding.append("file", file);
      formDataForBuilding.append("polygonData", JSON.stringify(polygonData));
      console.log("buildingData", {
        gettedBuildingId,
        name,
        address,
        area,
        email,
        description,
        type,
        noOfFloors,
        file,
        polygonData,
      });

      // create form data for floor ===>
      formDataForFloor.append("buildingId", gettedBuildingId);
      floors?.forEach((floor, i) => {
        if (!floor?.name || !floor.noOfParkingSpace || !floor.file)
          return toast.error("Please Fill all required fields each floor");
        const floorId = customObjectId();
        console.log("floorData", {
          gettedBuildingId,
          floorId,
          name: floor?.name,
          noOfParkingSpace: floor?.noOfParkingSpace,
          polygonData: floor?.polygonData,
        });
        formDataForFloor.append(`floors[${i}][_id]`, floorId);
        formDataForFloor.append(`floors[${i}][name]`, floor?.name);
        formDataForFloor.append(`floors[${i}][noOfParkingSpace]`, floor?.noOfParkingSpace);
        formDataForFloor.append(`files`, floor?.file);
        formDataForFloor.append(`floors[${i}][polygonData]`, JSON.stringify(floor?.polygonData));

        // create form data for slots ===>
        const slotData = { slots: [] };
        slotData.floorId = floorId;
        slotData.buildingId = gettedBuildingId;
        floor?.polygonData?.forEach((polygon) => {
          if (!polygon.id || !polygon.points) return toast.error("Please Fill all required fields each Slot");
          console.log("slots data", slotData);
          const singleSlot = {
            id: polygon.id,
            color: polygon?.color,
            fillColor: polygon?.fillColor,
            points: polygon?.points,
            sensorId: polygon.sensorId,
          };
          slotData.slots.push(singleSlot);
        });
        allSlotsFormData.push(slotData);
      });

      let message = "";
      ////////////////////////////////////////////////////////////
      // CREATE BUILDING IN DATABASE
      const resForBuilding = await createBuilding(formDataForBuilding).unwrap();
      if (resForBuilding.success) gettedBuildingId = resForBuilding?.data?._id;
      else throw new Error(resForBuilding?.message);
      // create floors in database
      ///////////////////////////////////////////////////////////
      // CREATE FLOORS IN DATABASE
      const resForFloor = await createFloorInBulk(formDataForFloor).unwrap();
      if (resForFloor.success) message = `Building, ${resForFloor?.data?.length} Floor `;
      else throw new Error(resForFloor?.message);
      // ////////////////////////////////////////////////////////////
      // // CREATE SLOTS IN DATABASE
      let slots = 0;
      await Promise.all(
        allSlotsFormData.map(async (slotFormData) => {
          const resForSlots = await createSlotsInBulk(slotFormData).unwrap();
          if (resForSlots.success) slots += resForSlots?.data?.length;
          if (!resForSlots?.success) throw new Error(resForSlots?.message);
        })
      );
      await refetchHook();
      toast.success(`${message} and ${slots} Slots added successfully`);
      console.log(`${message} and ${slots} Slots added successfully`);

      dispatch(resetBuildings());
      dispatch(resetFloors());
      dispatch(setActiveAccordionIndex(null));
      setCurrentStep(0);
    } catch (error) {
      console.log("Error in stepperSubmitHandler:", error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="mt-4">
      <h4 className="text-base md:text-xl font-medium text-[#414141] text-center">Confirmation</h4>
      {/* General info */}
      <div className="mt-5">
        <GeneralInfoSec setCurrentStep={setCurrentStep} />
      </div>
      {/* Floor info */}
      {floors?.map((floor, i) => (
        <FloorSensorInfoSec setCurrentStep={setCurrentStep} floor={floor} key={i} />
      ))}
      <div className="mt-5 flex justify-end">
        <div className="flex items-center gap-4">
          <Button
            text="Back"
            width="w-20 sm:w-[110px]"
            bg="bg-transparent hover:bg-primary hover:text-white"
            color="text-primary"
            onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
          />
          <Button
            className={`${isLoading || isLoadingForFloor || isLoadingForSlots ? "cursor-not-allowed opacity-30" : ""}`}
            width="w-[120px]"
            type="button"
            text="Save"
            onClick={stepperSubmitHandler}
            disabled={isLoading || isLoadingForFloor || isLoadingForSlots}
          />
        </div>
      </div>
    </div>
  );
};

export default Confirmation;

const GeneralInfoSec = ({ setCurrentStep }) => {
  const { buildingGeneralInfo } = useSelector((state) => state.building);
  return (
    <section>
      <div className="flex items-center justify-between">
        <h6 className="text-sm md:text-base font-medium text-primary">General Info</h6>
        <button onClick={() => setCurrentStep(0)}>
          <AccordionEditIcon color="#18BC9C" />
        </button>
      </div>
      <div className="mt-1 grid grid-cols-3 gap-4 md:gap-6">
        <img
          src={buildingGeneralInfo?.buildingImage || "https://placehold.co/400x300"}
          alt="image"
          className="w-full h-[160px] object-cover rounded-xl border-[4px] border-primary"
        />
        {/* building list */}
        <div className="flex flex-col justify-center">
          <List name="Name" value={buildingGeneralInfo?.name} />
          <List name="Address" value={buildingGeneralInfo?.address} />
          <List name="Total Area" value={buildingGeneralInfo?.area} />
          <List name="Total number of floors" value={buildingGeneralInfo?.noOfFloors} />
          <List name="Second E-mail" value={buildingGeneralInfo?.email} />
          <List name="Building Type" value={buildingGeneralInfo?.type} />
        </div>

        <div>
          <h6 className="text-xs sm:text-sm font-semibold text-[#353535]">Longitude:</h6>
          <p className="mt-1 text-xs sm:text-sm font-medium text-[#41414199]">{buildingGeneralInfo?.longitude}</p>
          <h6 className="text-xs sm:text-sm font-semibold text-[#353535]">Latitude:</h6>
          <p className="mt-1 text-xs sm:text-sm font-medium text-[#41414199]">{buildingGeneralInfo?.latitude}</p>
          <h6 className="text-xs sm:text-sm font-semibold text-[#353535]">Description:</h6>
          <p className="mt-1 text-xs sm:text-sm font-medium text-[#41414199]">{buildingGeneralInfo?.description}</p>
        </div>
      </div>
    </section>
  );
};

const FloorSensorInfoSec = ({ setCurrentStep, floor }) => {
  const dispatch = useDispatch();
  const { activeAccordionIndex } = useSelector((state) => state.floor);

  const editFloorHandler = (index) => {
    setCurrentStep(1);
    dispatch(setActiveAccordionIndex(activeAccordionIndex == index ? null : index));
  };
  return (
    <section className="mt-3">
      <h6 className="text-sm md:text-base font-medium text-primary">Floors/Sensor info</h6>
      <div className="mt-1 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        <img
          src={floor?.floorImage || "https://placehold.co/400x300"}
          alt="image"
          className="lg:col-span-4 w-full h-[160px] object-cover rounded-xl border-[4px] border-primary"
        />
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between bg-primary rounded-t-[4px] px-[14px] py-2 -mb-[1px] relative z-10">
            <h6 className="text-xs sm:text-sm text-white font-bold">Floor No {floor?.floorNumber}</h6>
            <div className="flex items-center gap-3">
              <button onClick={() => editFloorHandler(floor?.floorNumber - 1)}>
                <AccordionEditIcon />
              </button>
              {/* <button onClick={removeFloorFromRedux}>
                <AccordionDeleteIcon />
              </button> */}
            </div>
          </div>
          <div className="rounded-b-[4px] border border-[#0000003f] max-h-[125px] overflow-y-scroll custom-scroll">
            <div className="flex items-center justify-between py-[6px] px-[14px] border-b border-[#B0B0B080]">
              <List name="Floor Name" value={floor?.name} />
              <List name="No of Parking Spaces" value={floor?.noOfParkingSpace} />
            </div>
            {sensors?.map((floor, i) => (
              <SingleFloor key={i} floor={floor} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SingleFloor = ({ floor }) => {
  return (
    <div className="flex items-center justify-between py-[6px] px-[14px] border-b border-[#B0B0B080]">
      <h6 className="text-[10px] text-[#313131] font-medium">{floor?.parking}</h6>
      <p className="text-[10px] text-[#313131] font-medium">{floor?.sensor}</p>
    </div>
  );
};

const List = ({ name, value }) => {
  return (
    <div className="flex items-center justify-between gap-4 mt-1">
      <h6 className="text-xs sm:text-sm font-semibold text-[#353535]">{name}:</h6>
      <p className="text-xs sm:text-sm font-medium text-[#41414199] min-w-[130px]">{value}</p>
    </div>
  );
};
