export type FiltersProps = {
  query: string;
  sortBy: string;
  dateRange: string;
  setQuery: (query: string) => void;
  setSortBy: (sortBy: string) => void;
  setDateRange: (dateRange: string) => void;
};
