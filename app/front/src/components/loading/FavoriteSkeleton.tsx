import React from "react";
import { Skeleton } from "../ui/skeleton";

const FavoriteSkeleton = () => {
  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className="bg-gray-100 p-3 md:p-4 rounded-md transition duration-300 hover:scale-105">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-white" />
          <Skeleton className="h-4 w-[250px] bg-white" />
        </div>
        <div className="flex justify-between mt-6">
          <Skeleton className="h-4 w-[90px] bg-white" />
          <Skeleton className="h-4 w-[50px] bg-white" />
        </div>
      </div>
      <div className="bg-gray-100 p-3 md:p-4 rounded-md transition duration-300 hover:scale-105">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-white" />
          <Skeleton className="h-4 w-[250px] bg-white" />
        </div>
        <div className="flex justify-between mt-6">
          <Skeleton className="h-4 w-[90px] bg-white" />
          <Skeleton className="h-4 w-[50px] bg-white" />
        </div>
      </div>
      <div className="bg-gray-100 p-3 md:p-4 rounded-md transition duration-300 hover:scale-105">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-white" />
          <Skeleton className="h-4 w-[250px] bg-white" />
        </div>
        <div className="flex justify-between mt-6">
          <Skeleton className="h-4 w-[90px] bg-white" />
          <Skeleton className="h-4 w-[50px] bg-white" />
        </div>
      </div>
    </div>
  );
};

export default FavoriteSkeleton;
