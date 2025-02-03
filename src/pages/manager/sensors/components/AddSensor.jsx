/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../../../../components/shared/small/Button";
import Input from "../../../../components/shared/small/Input";
import toast from "react-hot-toast";
import Dropdown from "../../../../components/shared/small/Dropdown";
import { useCreateSensorMutation } from "../../../../redux/apis/sensorApis";

const AddSensor = ({ refetch, onClose }) => {
  const [createSensor, { isLoading }] = useCreateSensorMutation();
  const [formData, setFormData] = useState({ name: "", uniqueId: "", type: "" });
  const formValuesHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.uniqueId || !formData.type) return toast.error("Please Select All Fields");
      const res = await createSensor({ name: formData.name, uniqueId: formData.uniqueId, type: formData.type }).unwrap();
      await refetch();
      if (res.success) toast.success(res?.message);
      onClose();
    } catch (error) {
      console.log("error in create Sensor handler:", error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <form className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5" onSubmit={formSubmitHandler}>
      <div className="lg:col-span-6">
        <Input
          onChange={formValuesHandler}
          name="name"
          value={formData.name}
          placeholder="Sensor name"
          label="Sensor name"
        />
      </div>
      <div className="lg:col-span-6">
        <Input
          onChange={formValuesHandler}
          name="uniqueId"
          value={formData.uniqueId}
          placeholder="23920393"
          label="Unique ID"
        />
      </div>
      <div className="lg:col-span-12">
        <Dropdown
          defaultText="Select Type"
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

export default AddSensor;
