"use client";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/index";
import { getStories } from "@/store/slices/storiesSlice";
import StoriesList from "@/components/home/Stories";
import HeroSection from "@/components/home/HeroSection";
import Filters from "@/components/home/Filters";
import { DateRangeProps } from "@/types/DateRangeProps";
import StoriesLoading from "@/components/loading/StoriesLoading";

const Home: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    list: stories,
    totalPages,
    loading,
    query,
    sortBy,
    dateRange,
  } = useSelector((state: RootState) => state.stories);
  
  const [localQuery, setLocalQuery] = useState<string>(query);
  const [localSortBy, setLocalSortBy] = useState<string>(sortBy);
  const [localDateRange, setLocalDateRange] = useState<DateRangeProps>(
    dateRange ?? { from: undefined, to: undefined }
  );

  const handleApplyFilters = (filters: {
    query: string;
    sortBy: string;
    dateRange?: DateRangeProps;
  }) => {
    setLocalQuery(filters.query);
    setLocalSortBy(filters.sortBy);
    setLocalDateRange(filters.dateRange ?? { from: undefined, to: undefined });
  };

  useEffect(() => {
    dispatch(
      getStories({
        query: localQuery,
        sortBy: localSortBy,
        dateRange: localDateRange,
      })
    );
  }, [dispatch, localQuery, localSortBy, localDateRange]);

  return (
    <div>
      <div className="bg-white py-5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <HeroSection />
          <Filters onApplyFilters={handleApplyFilters} loading={loading} />
          {loading ? (
            <StoriesLoading />
          ) : (
            <StoriesList
              posts={stories}
              initialTotalPages={totalPages}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
