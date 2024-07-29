import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    login: (state, action) => {
      return action.payload;
    },
    logout: (state, action) => {
      return {};
    },
  },
});