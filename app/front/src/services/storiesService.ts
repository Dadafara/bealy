import { DateRangeProps } from "@/types/DateRangeProps";
import type { Stories } from "@/types/Stories";

export const fetchStories = async ({
  query,
  sortBy,
  dateRange,
  page = 0,
}: {
  query?: string;
  sortBy?: string;
  dateRange?: DateRangeProps;
  page?: number;
}): Promise<{ stories: Stories[]; totalPages: number }> => {
  try {
    const baseUrl =
      sortBy === "byDate"
        ? "https://hn.algolia.com/api/v1/search_by_date?tags=story"
        : "https://hn.algolia.com/api/v1/search?tags=story";

    const url = new URL(baseUrl);
    url.searchParams.append("page", page.toString());

    if (query) url.searchParams.append("query", query);

    if (dateRange?.from && dateRange?.to) {
      url.searchParams.append(
        "numericFilters",
        `created_at_i>${Math.floor(
          dateRange.from.getTime() / 1000
        )},created_at_i<${Math.floor(dateRange.to.getTime() / 1000)}`
      );
    }

    const res = await fetch(url.toString(), { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Erreur lors de la récupération des stories");
    }

    const jsonData = await res.json();
    return {
      stories: jsonData.hits,
      totalPages: jsonData.nbPages,
    };
  } catch (error) {
    console.error("Erreur:", error);
    return { stories: [], totalPages: 0 };
  }
};

