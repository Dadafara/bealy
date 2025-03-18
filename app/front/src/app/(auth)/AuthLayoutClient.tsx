"use client";

import { Toaster } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { verifyUser } from "@/store/slices/authSlice";
import Cookies from 'cookies-js';

export default function AuthLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("auth_token");
      
      if (token) {
        try {
          await dispatch(verifyUser()).unwrap();
          
          router.push("/user");
        } catch (err) {
          return
        }
      }
    };
    
    checkAuth();
  }, [dispatch, router]);

  return (
    <>
      <Toaster position="top-right" />
      <main className="w-full bg-[#F7F7F7] min-h-screen">{children}</main>
    </>
  );
}