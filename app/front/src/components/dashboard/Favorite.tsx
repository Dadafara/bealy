"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchUserInfo } from "@/store/slices/userSlice";
import Cookies from "cookies-js";
import { getStories } from "@/store/slices/storiesSlice";
import FavoriteSkeleton from "@/components/loading/FavoriteSkeleton";
import FavoriteCard from "../card/FavoriteCard";

const FAVORITES_PREFIX = "USER_FAVORITES_";

const Favorite = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { list: stories } = useSelector((state: RootState) => state.stories);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [currentUser, dispatch]);

  useEffect(() => {
    dispatch(getStories({}));
  }, [dispatch]);

  useEffect(() => {
    if (!currentUser) return;

    const cookieKey = `${FAVORITES_PREFIX}${currentUser?.id}`;
    const storedFavorites = Cookies.get(cookieKey);

    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error("Erreur lors du parsing des favoris:", error);
        setFavorites([]);
      }
    } else {
      setFavorites([]);
    }

    setTimeout(async () => {
        setLoadingFavorites(false);
    }, 3000)
  }, [currentUser]);

  const toggleFavorite = (objectID: string) => {
    if (!currentUser) return;

    let updatedFavorites;
    if (favorites.includes(objectID)) {
      updatedFavorites = favorites.filter((id) => id !== objectID);
    } else {
      updatedFavorites = [...favorites, objectID];
    }

    setFavorites(updatedFavorites);
    Cookies.set(`${FAVORITES_PREFIX}${currentUser.id}`, JSON.stringify(updatedFavorites), { expires: 365 });
  };

  const favoriteStories = stories.filter((story) => favorites.includes(story.objectID));

  return (
    <div className="max-w-6xl mx-auto">
      <div className="pt-28 w-Full p-4">
        <h3 className="text-bold text-2xl underline text-center mb-10">All stories favorite</h3>

        {loadingFavorites ? (
          <FavoriteSkeleton />
        ) : favoriteStories.length === 0 ? (
          <p className="p-4 text-center text-gray-500">
            {"You don't have any favorite items yet."}
          </p>
        ) : (
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {favoriteStories.map((story) => (
              <FavoriteCard
                key={story.objectID}
                story={story}
                isFavorite={favorites.includes(story.objectID)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorite;
