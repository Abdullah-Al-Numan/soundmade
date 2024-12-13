import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IGlobal {
  isOpenSidebar: boolean;
}

const initialState: IGlobal = {
  isOpenSidebar: true,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setOpenSidebar: (state, action: PayloadAction<boolean>) => {
      state.isOpenSidebar = action.payload;
    },
  },
});

export const { setOpenSidebar } = globalSlice.actions;

export default globalSlice.reducer;
