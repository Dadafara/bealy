"use client";

import AuthHeader from "@/components/globals/AuthHeader";
import { Toaster } from "@/components/ui/sonner";
import { AppDispatch, RootState } from "@/store";
import { verifyUser } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from 'cookies-js';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("auth_token");
      
      if (token) {
        try {
          await dispatch(verifyUser()).unwrap();
        } catch (err) {
          console.error("Erreur de vérification:", err);
          router.push("/account/login");
        }
      } else {
        router.push("/account/login");
      }
      setIsChecking(false);
    };
    
    checkAuth();
  }, [dispatch, router]);

  if (isChecking) return null;
  
  if (!isAuthenticated) {
    router.push("/account/login");
    return null;
  }

  return (
    <>
      <AuthHeader />
      <Toaster position="top-right" />
      <main>{children}</main>
    </>
  );
}
