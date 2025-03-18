import React from "react";
import Image from "next/image";
import { ProfileImageUploadProps } from "@/types/Profil";
import { format } from "date-fns";

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  profilUrl,
  username, createdAt,
  onImageUpload,
}) => (
  <div className="text-center mb-8 md:mb-0">
    <label>
      <Image
        src={
          profilUrl
            ? URL.createObjectURL(profilUrl)
            : "/assets/icons/user-circle.svg"
        }
        width={50}
        height={50}
        alt="Profile Picture"
        className="rounded-full w-36 h-36 sm:w-48 sm:h-48 object-cover mx-auto mb-4 border-4 border-blue-400 transition-transform duration-300 hover:scale-105"
      />
      <input
        type="file"
        style={{ display: "none" }}
        accept="image/*"
        onChange={onImageUpload}
      />
    </label>
    <div className="text-gray-700 dark:text-gray-300">
      <h3 className="text-lg sm:text-xl text-bold text-black/80">{username}</h3>
      <p className="text-xs sm:text-sm">
        {createdAt ? format(new Date(createdAt), "EEEE, dd MMMM yyyy") : ""}
      </p>
    </div>
  </div>
);

export default ProfileImageUpload;
