/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../../../../components/shared/small/Button";
import Input from "../../../../components/shared/small/Input";
import toast from "react-hot-toast";
import Dropdown from "../../../../components/shared/small/Dropdown";
import { useUpdateSingleSensorMutation } from "../../../../redux/apis/sensorApis";

const EditSensor = ({ refetch, onClose, selectedSensor }) => {
  const [updateSensor, { isLoading }] = useUpdateSingleSensorMutation();
  const [formData, setFormData] = useState({
    name: selectedSensor?.name,
    uniqueId: selectedSensor?.uniqueId,
    type: selectedSensor?.type,
  });

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = { name: formData.name, uniqueId: formData.uniqueId, type: formData.type };
      const res = await updateSensor({ id: selectedSensor?._id, data }).unwrap();
      toast.success(res?.message);
      await refetch();
      onClose();
    } catch (error) {
      console.log("Error in update sensor", error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <form className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5" onSubmit={formSubmitHandler}>
      <div className="lg:col-span-6">
        <Input
          name="sensorName"
          placeholder="Sensor name"
          label="Sensor name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="lg:col-span-6">
        <Input
          name="sensorId"
          placeholder="23920393"
          label="Sensor ID"
          value={formData.uniqueId}
          onChange={(e) => setFormData({ ...formData, uniqueId: e.target.value })}
        />
      </div>
      <div className="lg:col-span-12">
        <Dropdown
          defaultText={formData.type || "Select Type"}
          options={[
            { option: "Select Type", value: "" },
            { option: "Parking", value: "parking" },
          ]}
          onSelect={(value) => setFormData({ ...formData, type: value })}
          name="type"
        />
      </div>
      <div className="lg:col-span-12 flex justify-end">
        <div className="flex items-center gap-4">
          <Button
            text="Cancel"
            width="w-20 sm:w-[110px]"
            bg="bg-transparent hover:bg-primary hover:text-white"
            color="text-primary"
            onClick={onClose}
          />
          <Button
            disabled={isLoading}
            className={`${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            width="w-[120px]"
            type="submit"
            text="Add"
          />
        </div>
      </div>
    </form>
  );
};

export default EditSensor;
