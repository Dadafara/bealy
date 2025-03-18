import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchStories } from "@/services/storiesService";
import { StoriesState } from "@/types/StoriesState";
import { Stories } from "@/types/Stories";
import { DateRangeProps } from "@/types/DateRangeProps";

export const getStories = createAsyncThunk(
  "stories/getStories",
  async (
    params: { query?: string; sortBy?: string; dateRange?: DateRangeProps } = {}, // Rendre `params` optionnel
    thunkAPI
  ) => {
    try {
      const response = await fetchStories(params || {}); // Passer un objet vide par défaut
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue("An error occurred while fetching stories");
    }
  }
);

const initialState: StoriesState = {
  list: [],
  totalPages: 0,
  loading: false,
  error: null,
  query: "",
  sortBy: "",
  dateRange: { from: undefined, to: undefined },
};

const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setDateRange: (state, action: PayloadAction<DateRangeProps>) => {
      state.dateRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStories.fulfilled, (state, action: PayloadAction<{ stories: Stories[]; totalPages: number }>) => {
        state.loading = false;
        state.list = action.payload.stories;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setQuery, setSortBy, setDateRange } = storiesSlice.actions;
export default storiesSlice.reducer;