import React from "react";
import { Skeleton } from "../ui/skeleton";

const StorieSkeleton = () => {
  return (
    <div className="bg-gray-100 p-3 md:p-4 rounded-md transition duration-300 hover:scale-105">
      <div className="flex items-center space-x-3">
        <Skeleton className="h-12 w-12 rounded-full bg-white aspect-square" />
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-full bg-white" />
          <Skeleton className="h-4 w-2/3 bg-white" />
        </div>
      </div>
      <div className="space-y-2 mt-4">
        <Skeleton className="h-4 w-full bg-white" />
        <Skeleton className="h-4 w-full bg-white" />
        <Skeleton className="h-4 w-[200px] bg-white" />
      </div>
    </div>
  );
};

export default StorieSkeleton;
