import React from "react";
import { ProfileInfoProps } from "@/types/Profil";
import { Mail, Phone } from "lucide-react";

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  description,
  email,
  phone,
}) => (
  <div className="md:w-2/3 md:pl-8 max-md:text-center">
    <h2 className="text-lg sm:text-xl text-bold text-black/80 mb-1 underline">About Me</h2>
    <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm sm:text-base">
      {description || "No information available."}
    </p>
    <h2 className="text-lg sm:text-xl text-bold text-black/80 mb-1 underline">
      Contact Information
    </h2>
    <ul className="space-y-1 text-gray-700">
      <li className="flex items-center max-md:justify-center gap-x-3 text-sm sm:text-base">
        <Mail size={18} />
        {email ? email : "---------"}
      </li>
      <li className="flex items-center max-md:justify-center gap-x-3 text-sm sm:text-base">
        <Phone size={18} />
        {phone ? phone : "---------"}
      </li>
    </ul>
  </div>
);

export default ProfileInfo;
