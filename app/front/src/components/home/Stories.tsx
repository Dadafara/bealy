"use client";
import type { Stories } from "@/types/Stories";
import React, { useCallback, useEffect, useState } from "react";
import Cookies from "cookies-js";
import { motion } from "framer-motion";
import StorieCard from "../card/StorieCard";
import { fetchStories } from "@/services/storiesService";
import { Input } from "../ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useSelector } from "react-redux";
import { fetchUserInfo } from "@/store/slices/userSlice";

type Props = {
  posts: Stories[];
  initialTotalPages: number;
};

const FAVORITES_PREFIX = "USER_FAVORITES_";

const StoriesList: React.FC<Props> = ({ posts, initialTotalPages }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [stories, setStories] = useState<Stories[]>(posts);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(initialTotalPages);
  const [loading, setLoading] = useState<boolean>(false);
  const [customPage, setCustomPage] = useState<string>("");
  const [erreurCustomPage, setErreurCustomPage] = useState<string>("");

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [currentUser, dispatch]);

  const getFavoritesCookieKey = (userId: number) => {
    return `${FAVORITES_PREFIX}${userId}`;
  };

  const toggleFavorite = (storyId: string) => {
    if (!currentUser) return;

    let updatedFavorites;

    if (favorites.includes(storyId)) {
      updatedFavorites = favorites.filter((id) => id !== storyId);
    } else {
      updatedFavorites = [...favorites, storyId];
    }

    setFavorites(updatedFavorites);

    const cookieKey = getFavoritesCookieKey(currentUser.id);
    Cookies.set(cookieKey, JSON.stringify(updatedFavorites));
  };

  const fetchPage = useCallback(
    async (newPage: number) => {
      if (newPage < 0 || newPage >= totalPages || loading) return;

      setLoading(true);
      const { stories, totalPages: newTotalPages } = await fetchStories({
        query: "",
        sortBy: "byDate",
        page: newPage,
      });

      setStories(stories);
      setTotalPages(newTotalPages);
      setPage(newPage);
      setLoading(false);
    },
    [loading, totalPages]
  );

  const handleCustomePage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setCustomPage(value);
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(customPage, 10) - 1;
    if (isNaN(pageNumber)) {
      setErreurCustomPage(
        `Please enter a valid page number between 1 and ${totalPages}.`
      );
      return;
    }

    if (pageNumber + 1 > totalPages) {
      setErreurCustomPage(
        `The page number is invalid. Please enter a value between 1 and ${totalPages}.`
      );
      return;
    }

    fetchPage(pageNumber);
    setCustomPage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto grid grid-cols-1 gap-6 pt-8 lg:mx-0 lg:max-w-none sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {stories.map((storie) => (
          <StorieCard
            key={storie.objectID}
            storie={storie}
            isFavorite={favorites.includes(storie.objectID)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </motion.div>
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={() => fetchPage(page - 1)}
          disabled={page <= 0 || loading}
          className={`p-1 ring-1 ring-gray-600 rounded-full duration-300 transition-all ${
            page <= 0 || loading
              ? "cursor-not-allowed bg-gray-300 text-gray-400 ring-gray-400"
              : "cursor-pointer hover:bg-black/80 hover:text-white"
          }`}
        >
          <ChevronLeft
            className={`duration-300 transition-all ${
              page <= 0 || loading
                ? "text-gray-400"
                : "text-gray-700 hover:text-white"
            }`}
          />
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={() => fetchPage(page + 1)}
          disabled={page >= totalPages - 1 || loading}
          className={`p-1 ring-1 ring-gray-600 rounded-full duration-300 transition-all ${
            page >= totalPages - 1 || loading
              ? "cursor-not-allowed bg-gray-300 text-gray-400 ring-gray-400"
              : "cursor-pointer hover:bg-black/80 hover:text-white"
          }`}
        >
          <ChevronRight
            className={`duration-300 transition-all ${
              page >= totalPages - 1 || loading
                ? "text-gray-400"
                : "text-gray-700 hover:text-white"
            }`}
          />
        </button>
        <div className="flex items-center gap-x-2">
          <span className="text-sm text-gray-800 dark:text-white">
            Go to page
          </span>
          <Input
            type="text"
            value={customPage}
            onChange={handleCustomePage}
            placeholder="page"
            className="w-16 text-center ring-1 ring-black/70"
          />
          <Button onClick={handleGoToPage} className="text-sm">
            Go
          </Button>
        </div>
      </div>

      <p className="mt-2 text-red-500 text-xs text-center">
        {erreurCustomPage}
      </p>
    </>
  );
};

export default StoriesList;
