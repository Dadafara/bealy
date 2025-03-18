"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { login } from "@/services/authService";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login({ username, password });
      toast("Login successfully", {
        description: "Your account has been created! You can now log in.",
        style: {
          background: "#00b542",
          color: "#fff",
        },
      });
      router.push('/user');
    } catch (error) {
      toast("Error", {
        description: `${error instanceof Error ? error.message : 'Échec de la connexion'}`,
        style: {
          background: "#d70000",
          color: "#fff",
        },
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen  w-full items-center justify-center text-gray-600 bg-gray-50"
    >
      <div className="relative">
        <div className="relative flex flex-col sm:w-[30rem] rounded-xl border-gray-400 bg-white shadow-lg px-4">
          <div className="flex-auto p-6">
            <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
              <Link
                href="/"
                className="flex cursor-pointer items-center gap-2 text-bold text-3xl tracking-tight opacity-100 no-underline"
              >
                Hacker News
              </Link>
            </div>

            <h4 className="mb-2 text-semibold text-gray-700 xl:text-xl text-center">
              Welcome to Hacker News!
            </h4>
            <p className="mb-6 text-gray-500 text-center">
              Please sign in to access your account
            </p>

            <form onSubmit={handleLogin}>
              <div className="space-y-5">
                <Input
                  type="text"
                  className="ring-1 ring-black/70"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {setUsername(e.target.value)}}
                />
                <Input
                  type="password"
                  id="password"
                  className="ring-1 ring-black/70"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {setPassword(e.target.value)}}
                />
              </div>
              <div className="mt-8">
                <Button className="w-full text-semibold text-white text-base">
                  {loading && <Loader2 className="animate-spin" />}
                  Login
                </Button>
              </div>
            </form>

            <p className="mb-4 text-center mt-5">
              New on Hacker News?
              <Link
                href="/account/register"
                className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500"
              >
                {" "}
                Create an account{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
