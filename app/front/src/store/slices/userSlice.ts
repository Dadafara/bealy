import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../services/userService";
import { User, UserState } from "@/types/User";

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      return await userService.getUserInfo();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch user info");
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      return await userService.updateUserInfo(userData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to update user info");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
