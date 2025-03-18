"use client";

import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart } from "lucide-react";
import Image from "next/image";

type StoryCardProps = {
  storie: {
    objectID: string;
    author: string;
    created_at: string;
    title: string;
    url: string;
    points: number;
    num_comments?: number;
    story_id: string;
  };
  isFavorite: boolean;
  onToggleFavorite: (storyId: string) => void;
};

const StorieCard: React.FC<StoryCardProps> = ({
  storie,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <article className="flex max-w-xl p-3 md:p-4 flex-col items-start justify-between bg-[#f7f7f7] rounded-md transition duration-300 hover:scale-105">
      <div>
        <div className="relative flex items-center gap-x-3">
          <Image
            src="/assets/icons/user-circle.svg"
            alt="User Icon"
            className="size-10 rounded-full bg-gray-50"
            width={40}
            height={40}
          />
          <div>
            <p className="text-bold text-gray-900">
              <a href={`/user?id=${storie.author}`}>{storie.author}</a>
            </p>
            <time
              dateTime={storie.created_at}
              className="text-gray-500 text-xs"
            >
              {formatDistanceToNow(new Date(storie.created_at), {
                addSuffix: true,
              })}
            </time>
          </div>
        </div>

        <div className="group relative">
          <h3 className="mt-3 text-bold text-gray-900 group-hover:text-gray-600">
            <a href={storie.url} className="line-clamp-3">
              {storie.title}
            </a>
          </h3>
        </div>
      </div>

      <div className="flex items-center justify-between w-full text-xs mt-3">
        <div className="text-gray-600 text-xs flex-grow">
          {storie.points} points |{" "}
          <a
            href={`/item?id=${storie.story_id}`}
            className="duration-300 transition-all hover:underline"
          >
            {storie.num_comments !== null && storie.num_comments !== undefined
              ? storie.num_comments === 1
                ? `${storie.num_comments} comment`
                : `${storie.num_comments} comments`
              : "discuss"}
          </a>{" "}
        </div>
        <div className="flex items-center">
          {isFavorite ? (
            <Image
              src="/assets/icons/heart.svg"
              width={15}
              height={15}
              alt="Heart"
              className="size-3.5 cursor-pointer"
              onClick={() => onToggleFavorite(storie.objectID)}
            />
          ) : (
            <Heart
              size={15}
              className="cursor-pointer duration-300 transition-all hover:text-red-500"
              onClick={() => onToggleFavorite(storie.objectID)}
            />
          )}
        </div>
      </div>
    </article>
  );
};

export default StorieCard;
