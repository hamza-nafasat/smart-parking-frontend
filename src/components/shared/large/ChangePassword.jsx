'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import Button from '../small/Button';
import Input from '../small/Input';
import { useUpdateMyProfileMutation } from '../../../redux/apis/authApis';

const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updateProfile, { isLoading }] = useUpdateMyProfileMutation();
  console.log('oldPassword', oldPassword, confirmPassword);
  const { user } = useSelector((state) => state.auth);
  const userId = user?.user?._id;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!oldPassword || !newPassword || !confirmPassword) return toast.error('Please fill all the fields');
      if (newPassword !== confirmPassword) return toast.error('Passwords do not match');
      const formData = new FormData();
      formData.append('oldPassword', oldPassword);
      formData.append('newPassword', newPassword);
      const response = await updateProfile(formData).unwrap();
      if (response?.success) {
        toast.success(response?.message);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Error while changing password');
      console.log('Error while changing password', error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 rounded-xl border border-gray-200 p-5">
      <div className="relative">
        <Input
          rightIcon={
            <div className=" " onClick={() => setShowOldPassword(!showOldPassword)}>
              {showOldPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </div>
          }
          label="Old Password"
          name="password"
          type={showOldPassword ? 'text' : 'password'}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div className="relative">
        <Input
          rightIcon={
            <div onClick={() => setShowNewPassword(!showNewPassword)}>
              {showNewPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </div>
          }
          label="New Password"
          name="password"
          type={showNewPassword ? 'text' : 'password'}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="relative">
        <Input
          rightIcon={
            <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </div>
          }
          label="Confirm New Password"
          name="password"
          type={showConfirmPassword ? 'text' : 'password'}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="mt-3 flex items-center justify-end gap-4">
        <Button text="Change Password" type="submit" disabled={isLoading} width="!w-[180px]" />
      </div>
    </form>
  );
};

export default ChangePassword;
