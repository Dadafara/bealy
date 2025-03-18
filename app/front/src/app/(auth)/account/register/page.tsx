import Register from "@/components/auth/Register";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Register - Hacker News",
  keywords: "Hacker News, register, tech news, sign up",
  authors: [{ name: "Hacker News" }],
};

const page = () => {
  return <Register />;
};

export default page;
