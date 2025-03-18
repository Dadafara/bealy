import React from "react";
import { formatDistanceToNow } from "date-fns";

interface FavoriteCardProps {
  story: { objectID: string; title: string; created_at: string; url: string };
  isFavorite: boolean;
  onToggleFavorite: (objectID: string) => void;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({ story, isFavorite, onToggleFavorite }) => {
  return (
    <div
      key={story.objectID}
      className="px-4 py-3 flex flex-col justify-between border rounded-md transition duration-500 shadow-sm hover:shadow-md hover:shadow-gray-400"
    >
      <a href={story.url} className="text-lg font-bold mb-2 hover:underline">
        {story.title}
      </a>
      <div className="mt-4 flex items-center justify-between w-full">
        <time dateTime={story.created_at} className="text-gray-500 text-xs">
          {formatDistanceToNow(new Date(story.created_at), { addSuffix: true })}
        </time>
        <span
          onClick={() => onToggleFavorite(story.objectID)}
          className={`cursor-pointer ${isFavorite ? "text-red-500 hover:text-red-600" : "text-gray-500"}`}
        >
          {isFavorite ? "Remove" : "Add"}
        </span>
      </div>
    </div>
  );
};

export default FavoriteCard;
