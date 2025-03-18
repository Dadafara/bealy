"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC, useState } from "react";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { DateRangeProps } from "@/types/DateRangeProps";
import { motion } from "framer-motion";

interface FiltersProps {
  onApplyFilters: (filters: {
    query: string;
    sortBy: string;
    dateRange?: DateRangeProps;
  }) => void;
  loading: boolean;
}

const Filters: FC<FiltersProps> = ({ onApplyFilters, loading }) => {
  const [query, setQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("byPopularity");
  const [dateRange, setDateRange] = useState<DateRangeProps | undefined>(
    undefined
  );

  const handleApply = () => {
    const filters = {
      query,
      sortBy,
      dateRange,
    };

    onApplyFilters(filters);
  };

  return (
    <motion.div
      className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-2"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2">
        <label>Search</label>
        <Input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <label>by</label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Select a filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="byPopularity">Popularity</SelectItem>
              <SelectItem value="byDate">Date</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <label>for</label>
        <div className="grid gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className={cn(
                  "w-[250px] justify-start text-left font-normal",
                  !dateRange?.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                selected={dateRange}
                onSelect={(range) =>
                  setDateRange(
                    range
                      ? {
                          from: range.from ?? undefined,
                          to: range.to ?? undefined,
                        }
                      : undefined
                  )
                }
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button
          onClick={handleApply}
          disabled={loading}
          className={`${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          Apply
        </Button>
      </div>
    </motion.div>
  );
};

export default Filters;
