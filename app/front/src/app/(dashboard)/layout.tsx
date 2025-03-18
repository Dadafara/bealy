import React from "react";
import DashboardLayout from "./DashboardLayout";

export const metadata = {
  title: "Hacker News Dashboard",
  description:
    "Sign in to your Hacker News account to stay updated with the latest tech news and discussions.",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}