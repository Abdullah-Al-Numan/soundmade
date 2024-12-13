import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SessionType } from "@/types";

interface IAuth {
  session: SessionType | null;
}

const initialState: IAuth = {
  session: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<SessionType | null>) => {
      state.session = action.payload;
    },
  },
});

export const { setSession } = authSlice.actions;

export default authSlice.reducer;
