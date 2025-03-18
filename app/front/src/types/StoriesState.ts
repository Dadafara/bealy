import { DateRangeProps } from "./DateRangeProps";
import { Stories } from "./Stories";

export interface StoriesState {
  list: Stories[];
  totalPages: number;
  loading: boolean;
  error: string | null;
  query: string;
  sortBy: string;
  dateRange: DateRangeProps;
}
