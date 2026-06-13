import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalQueries: 0,
};

const queriesSlice = createSlice({
  name: "queries",
  initialState,
  reducers: {
    setTotalQueries: (state, action) => {
      state.totalQueries = action.payload;
    },
  },
});

export const { setTotalQueries } = queriesSlice.actions;
export default queriesSlice.reducer;
