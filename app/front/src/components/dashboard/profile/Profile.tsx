"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchUserInfo, updateUserInfo } from "@/store/slices/userSlice";
import { toast } from "sonner";
import ProfileImageUpload from "./ProfileImageUpload";
import ProfileInfo from "./ProfileInfo";
import ProfileEditDialog from "./ProfileEditDialog";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [profilUrl, setProfilUrl] = useState<File | null>(null);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const handleUpdateProfile = () => {
    dispatch(updateUserInfo({ username, email, age, phone, description }))
      .then(() => {
        toast("Profile updated successfully!", {
          description: "Your profile information has been updated.",
          style: { background: "#00b542", color: "#fff" },
        });
        setIsModalEdit(false);
        dispatch(fetchUserInfo());
      })
      .catch((error) => {
        toast("Failed to update profile.", {
          description:
            error.message || "An error occurred while updating your profile.",
          style: { background: "#ff4444", color: "#fff" },
        });
        setIsModalEdit(false);
      });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        setProfilUrl(file);
      } else {
        setProfilUrl(null);
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
      setEmail(currentUser.email);
      setAge(currentUser.age);
      setPhone(currentUser.phone);
      setDescription(currentUser.description);
    }
  }, [currentUser]);

  return (
    <div className="h-screen flex justify-center items-center max-md:pt-16 px-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-8">
        <div className="flex flex-col md:flex-row">
          <ProfileImageUpload
            profilUrl={profilUrl}
            username={currentUser?.username || ""}
            createdAt={currentUser?.createdAt || ""}
            onImageUpload={handleImageUpload}
          />
          <ProfileInfo
            description={currentUser?.description || ""}
            email={currentUser?.email || ""}
            phone={currentUser?.phone || ""}
          />
        </div>
        <ProfileEditDialog
          isModalEdit={isModalEdit}
          onOpenChange={setIsModalEdit}
          handleUpdateProfile={handleUpdateProfile}
          username={username}
          email={email}
          age={age}
          phone={phone}
          description={description}
          setEmail={setEmail}
          setAge={setAge}
          setPhone={setPhone}
          setDescription={setDescription}
        />
      </div>
    </div>
  );
};

export default Profile;
