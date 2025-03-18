import React from "react";
import Favorite from "@/components/dashboard/Favorite";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorite Stories",
  description: "Explore and manage your favorite stories here."
};

const Page = () => {
  return (
      <Favorite />
  );
};

export default Page;
