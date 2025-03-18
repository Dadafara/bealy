import Link from "next/link";
import React from "react";
import { BookHeart, LogOut, User } from "lucide-react";
import { logout } from "@/services/authService";
import Image from "next/image";

const AuthHeader = () => {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="fixed w-full bg-white text-indigo-800 z-50 shadow-lg animate-slide-down px-4">
      <div className="max-w-7xl mx-auto py-2 flex items-center justify-between h-16">
        <div className="flex items-center gap-x-10 text-xl">
          <Link
            href="/"
            className="flex items-center gap-1 w-full"
            prefetch={false}
          >
            <Image
              src="https://cdn.bealy.io/icons/bealyFavicon512.png"
              alt="Logo"
              width={50}
              height={50}
              className="w-8 md:w-16"
            />
            <span className="text-xl text-bold">Hacker News</span>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center gap-x-2">
            <Link
              href="/user"
              className="flex gap-1 items-center text-black/80 transition-all duration-300 rounded-full md:px-4 md:py-1 p-2 hover:bg-gray-200"
            >
              <User size={19} />
              <span className="mt-1 max-md:hidden">Profile</span>
            </Link>
            <Link
              href="/favorite"
              className="flex gap-1 items-center text-black/80 transition-all duration-300 rounded-full md:px-4 md:py-1 p-2 hover:bg-gray-200"
            >
              <BookHeart size={17} />
              <span className="mt-1 max-md:hidden">Favorite</span>
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="flex gap-2 items-center text-black/80 transition-all duration-300 rounded-full md:px-4 md:py-1 p-2 hover:bg-gray-200 cursor-pointer"
          >
            <LogOut size={17} /> <span className="max-md:hidden">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
