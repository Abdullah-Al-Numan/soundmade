import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/features/auth/authSlice";
import globalReducer from "@/redux/features/global/globalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    global: globalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
