import React from "react";
import StorieSkeleton from "../skeleton/StorieSkeleton";

const StoriesLoading = () => {
  return (
    <div className="mx-auto grid grid-cols-1 gap-6 pt-8 lg:mx-0 lg:max-w-none sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <StorieSkeleton />
        <StorieSkeleton />
        <StorieSkeleton />
        <StorieSkeleton />
        <StorieSkeleton />
        <StorieSkeleton />
        <StorieSkeleton />
        <StorieSkeleton />
    </div>
  );
};

export default StoriesLoading;
