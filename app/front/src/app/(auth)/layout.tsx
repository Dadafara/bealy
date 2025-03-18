import React from "react";
import { Metadata } from "next";
import AuthLayoutClient from "./AuthLayoutClient";

export const metadata: Metadata = {
  description: "Sign in to your Hacker News account to stay updated with the latest tech news and discussions.",
};


export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLayoutClient>{children}</AuthLayoutClient>;
}