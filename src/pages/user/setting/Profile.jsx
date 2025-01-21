import { useEffect, useState } from "react";
import Button from "../../../components/shared/small/Button";
import Input from "../../../components/shared/small/Input";
import { useGetMyProfileQuery, useUpdateMyProfileMutation } from "../../../redux/apis/authApis";
import toast from "react-hot-toast";
import Loader from "../../../components/shared/small/Loader";
import { userExist } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    state: "",
    country: "",
    contact: "",
    email: "",
    image: "",
  });
  const [imgSrc, setImgSrc] = useState("");
  const { data, isLoading, refetch } = useGetMyProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateMyProfileMutation();

  const imgSrcHandler = (e) => {
    setForm({ ...form, image: e.target.files[0] });
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) setImgSrc(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("address", form.address);
      formData.append("state", form.state);
      formData.append("country", form.country);
      formData.append("contact", form.contact);
      if (form?.image) formData.append("file", form.image);
      const res = await updateProfile(formData).unwrap();
      const user = await refetch().unwrap();
      await dispatch(userExist(user?.data));
      toast.success(res?.message);
      setIsFormEdit(false);
    } catch (error) {
      console.log("Error in updateProfileHandler:", error);
      toast.error(error?.data?.message);
    }
  };
  useEffect(() => {
    if (data) {
      let profile = data?.data;
      setForm({
        firstName: profile?.firstName || "",
        lastName: profile?.lastName || "",
        address: profile?.address || "",
        state: profile?.state || "",
        country: profile?.country || "",
        contact: profile?.contact || "",
        email: profile?.email || "",
      });
      setImgSrc(profile?.image?.url || "https://placehold.co/113x113");
    }
  }, [data, isFormEdit]);
  return isLoading ? (
    <Loader />
  ) : (
    <div className="flex justify-between gap-4 px-0 md:px-[40px] py-2 md:py-[30px]">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 grow" onSubmit={updateProfileHandler}>
        <div className="md:col-span-2 flex items-center gap-4">
          <div className="size-[70px] sm:size-[113px] rounded-full relative">
            <img src={imgSrc} alt="profile img" className="size-[70px] sm:size-[113px] rounded-full object-cover" />
            <input
              type="file"
              className="absolute inset-0 opacity-0 rounded-full"
              disabled={!isFormEdit}
              onChange={imgSrcHandler}
            />
          </div>
          <div>
            <h4 className="text-base md:text-lg text-[#000]">
              {data?.data?.firstName} {data?.data?.lastName}
            </h4>
            <p className="text-[10px] sm:text-xs text-[#00000060]">{data?.data?.email}</p>
          </div>
        </div>
        <div>
          <Input
            label="First Name"
            type="text"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            readOnly={!isFormEdit}
            style={{ cursor: isFormEdit ? "auto" : "auto" }}
          />
        </div>
        <div>
          <Input
            label="Last Name"
            type="text"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            readOnly={!isFormEdit}
            style={{ cursor: isFormEdit ? "auto" : "auto" }}
          />
        </div>
        <div>
          <Input
            label="Address"
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            readOnly={!isFormEdit}
            style={{ cursor: isFormEdit ? "auto" : "auto" }}
          />
        </div>
        <div>
          <Input
            label="Contact"
            type="tel"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            readOnly={!isFormEdit}
            style={{ cursor: isFormEdit ? "auto" : "auto" }}
          />
        </div>
        <div>
          <Input
            label="Country"
            type="text"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            readOnly={!isFormEdit}
            style={{ cursor: isFormEdit ? "auto" : "auto" }}
          />
        </div>
        <div>
          <Input
            label="State"
            type="text"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            readOnly={!isFormEdit}
            style={{ cursor: isFormEdit ? "auto" : "auto" }}
          />
        </div>
        {isFormEdit && (
          <div className="md:col-span-2 flex justify-end gap-4 mt-0 md:mt-4">
            <Button
              text="Cancel"
              width="w-[90px]"
              bg="bg-transparent hover:bg-primary hover:text-white"
              color="text-primary"
              onClick={() => setIsFormEdit(!isFormEdit)}
            />
            <Button
              onClick={updateProfileHandler}
              type="submit"
              text="Save"
              width="w-[90px]"
              disabled={isUpdating || isLoading}
              className={`${isUpdating || (isLoading && "cursor-not-allowed opacity-40")}`}
            />
          </div>
        )}
      </form>
      <div>
        <Button
          text={isFormEdit ? "Cancel" : "Edit"}
          width="w-[60px] md:w-[90px]"
          onClick={() => setIsFormEdit(!isFormEdit)}
        />
      </div>
    </div>
  );
};

export default Profile;
