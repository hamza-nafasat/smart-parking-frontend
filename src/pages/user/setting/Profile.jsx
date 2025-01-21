import { useEffect, useState } from "react";
import Button from "../../../components/shared/small/Button";
import Input from "../../../components/shared/small/Input";
import { useGetMyProfileQuery, useUpdateMyProfileMutation } from "../../../redux/apis/authApis";
import toast from "react-hot-toast";
import Loader from "../../../components/shared/small/Loader";

const Profile = () => {
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [imgSrc, setImgSrc] = useState("https://placehold.co/113x113");
  const [image, setImage] = useState(null);
  const { data, isLoading, refetch } = useGetMyProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateMyProfileMutation();

  const imgSrcHandler = (e) => {
    setImage(e.target.files[0]);
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
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("address", address);
      formData.append("state", state);
      formData.append("country", country);
      formData.append("contact", contact);
      if (image) formData.append("file", image);
      const res = await updateProfile(formData).unwrap();
      await refetch();
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
      setFirstName(profile?.firstName || "");
      setLastName(profile?.lastName || "");
      setAddress(profile?.address || "");
      setState(profile?.state || "");
      setCountry(profile?.country || "");
      setContact(profile?.contact || "");
      setEmail(profile?.email || "");
      setImgSrc(profile?.image?.url || "");
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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            readOnly={!isFormEdit}
            style={{ cursor: isFormEdit ? "auto" : "auto" }}
          />
        </div>
        <div>
          <Input
            label="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            readOnly={!isFormEdit}
            style={{ cursor: isFormEdit ? "auto" : "auto" }}
          />
        </div>
        <div>
          <Input
            label="Address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            readOnly={!isFormEdit}
            style={{ cursor: isFormEdit ? "auto" : "auto" }}
          />
        </div>
        <div>
          <Input
            label="Contact"
            type="tel"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            readOnly={!isFormEdit}
            style={{ cursor: isFormEdit ? "auto" : "auto" }}
          />
        </div>
        <div>
          <Input
            label="Country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            readOnly={!isFormEdit}
            style={{ cursor: isFormEdit ? "auto" : "auto" }}
          />
        </div>
        <div>
          <Input
            label="State"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            readOnly={!isFormEdit}
            style={{ cursor: isFormEdit ? "auto" : "auto" }}
          />
        </div>
        <div>
          <Input label="Email" type="email" value={email} readOnly style={{ cursor: isFormEdit ? "auto" : "auto" }} />
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
