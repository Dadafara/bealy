"use client";

import { store } from "@/store/index";
import { Provider } from "react-redux";

interface ProvidersProps {
  children: React.ReactNode;
}

export const StoreProvider = ({ children }: ProvidersProps) => {
  return <Provider store={store}>{children}</Provider>;
};
