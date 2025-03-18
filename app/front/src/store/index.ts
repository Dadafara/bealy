import { configureStore } from "@reduxjs/toolkit";
import storiesReducer from "./slices/storiesSlice";
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    stories: storiesReducer,
    user: userReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
