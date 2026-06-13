import { createSlice } from "@reduxjs/toolkit";
// redux toolkit import

interface AuthState {
  user: any;
  isAuth: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.isAuth = true;
    },

    logout: (state) => {
      state.user = null;

      state.isAuth = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;