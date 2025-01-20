import React, { useState } from "react";
import Button from "../../../components/shared/small/Button";
import Input from "../../../components/shared/small/Input";
import Dropdown from "../../../components/shared/small/Dropdown";

const Profile = () => {
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [firstName, setFirstName] = useState("MKS");
  const [lastName, setLastName] = useState("MKS");
  const [address, setAddress] = useState("New York City");
  const [contact, setContact] = useState("02342392323");
  const [email, setEmail] = useState("alexarawles@gmail.com");
  const [imgSrc, setImgSrc] = useState("https://placehold.co/113x113");

  const imgSrcHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImgSrc(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const formEditHandler = () => {
    setIsFormEdit(!isFormEdit);
  };
  return (
    <div className="flex justify-between gap-4 px-0 md:px-[40px] py-2 md:py-[30px]">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 grow">
        <div className="md:col-span-2 flex items-center gap-4">
          <div className="size-[70px] sm:size-[113px] rounded-full relative">
            <img
              src={imgSrc}
              alt="profile img"
              className="size-[70px] sm:size-[113px] rounded-full object-cover"
            />
            <input
              type="file"
              className="absolute inset-0 opacity-0 rounded-full"
              disabled={!isFormEdit}
              onChange={imgSrcHandler}
            />
          </div>
          <div>
            <h4 className="text-base md:text-lg text-[#000]">MKS</h4>
            <p className="text-[10px] sm:text-xs text-[#00000060]">alexarawles@gmail.com</p>
          </div>
        </div>
        <div>
          <Input
            label="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            readOnly={!isFormEdit}
            style={{cursor: isFormEdit ? "auto" : "auto"}}
          />
        </div>
        <div>
          <Input
            label="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            readOnly={!isFormEdit}
            style={{cursor: isFormEdit ? "auto" : "auto"}}
          />
        </div>
        <div>
          <Input
            label="Address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            readOnly={!isFormEdit}
            style={{cursor: isFormEdit ? "auto" : "auto"}}
          />
        </div>
        <div>
          <Input
            label="Contact"
            type="tel"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            readOnly={!isFormEdit}
            style={{cursor: isFormEdit ? "auto" : "auto"}}
          />
        </div>
        <div>
          <Label label="Country" />
          <Dropdown
            defaultText="Country Name"
            options={[
              { option: "USA", value: "USA" },
              { option: "UK", value: "UK" },
            ]}
            disabled={!isFormEdit}
            style={{cursor: isFormEdit ? "auto" : "auto"}}
          />
        </div>
        <div>
          <Label label="State" />
          <Dropdown
            defaultText="Your State"
            options={[
              { option: "USA", value: "USA" },
              { option: "UK", value: "UK" },
            ]}
            disabled={!isFormEdit}
            style={{cursor: isFormEdit ? "auto" : "auto"}}
          />
        </div>
        <div>
          <Input
            label="My email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={!isFormEdit}
            style={{cursor: isFormEdit ? "auto" : "auto"}}
          />
        </div>
        {isFormEdit && (
          <div className="md:col-span-2 flex justify-end gap-4 mt-0 md:mt-4">
            <Button
              text="Cancel"
              width="w-[90px]"
              bg="bg-transparent hover:bg-primary hover:text-white"
              color="text-primary"
              onClick={formEditHandler}
            />
            <Button type="submit" text="Save" width="w-[90px]" />
          </div>
        )}
      </form>
      <div>
        <Button
          text="Edit"
          width="w-[60px] md:w-[90px]"
          onClick={formEditHandler}
        />
      </div>
    </div>
  );
};

export default Profile;

const Label = ({ label }) => {
  return (
    <label className="text-xs md:text-sm text-[#000] mb-2 block">{label}</label>
  );
};
