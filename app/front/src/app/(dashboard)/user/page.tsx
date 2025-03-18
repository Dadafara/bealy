import React from "react";
import Profile from "@/components/dashboard/profile/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Update and manage your profile details on My Website.",
};

const Page = () => {
  return (
    <Profile />
  );
};

export default Page;
