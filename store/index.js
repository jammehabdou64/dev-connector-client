"use client";
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profileSlice";
import postReducer from "../features/postSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    post: postReducer,
  },
});
