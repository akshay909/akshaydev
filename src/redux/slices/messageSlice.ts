import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Toast = {
  id: string;
  message: string; 
  status: "success" | "error"; 
};

interface MessageState {
  toasts: Toast[]; 
}

const initialState: MessageState = {
  toasts: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    showMessage: (
      state,
      action: PayloadAction<{ message: string; status: "success" | "error" }>
    ) => {
      const id = crypto.randomUUID(); 

      state.toasts.push({
        id,
        message: action.payload.message,
        status: action.payload.status,
      });
    },

    removeMessage: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { showMessage, removeMessage } = messageSlice.actions;

export default messageSlice.reducer;