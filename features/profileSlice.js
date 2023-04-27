"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProfile = createAsyncThunk("fetch/profile", async (token) => {
  const res = await fetch(`http://localhost:8050/api/profile/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data?.success ? data.message : {};
});

const initialState = {
  profile: {},
  loading: true,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    removeProfile(state, { payload }) {
      return { ...state, profile: {} };
    },
  },

  extraReducers: (build) => {
    build.addCase(fetchProfile.fulfilled, (state, action) => {
      state.profile = { ...action.payload };
      state.loading = false;
    });
  },
});

export const { removeProfile } = profileSlice.actions;

export default profileSlice.reducer;
