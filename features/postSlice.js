import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("fetch/post", async (token) => {
  const res = await fetch(`http://localhost:8050/api/posts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data?.success ? data.message : [];
});

const initialState = {
  posts: [],
  loading: true,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    removePost(state, { payload }) {
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    },
  },

  extraReducers: (build) => {
    build.addCase(fetchPosts.fulfilled, (state, { payload }) => {
      state.posts = payload;
      state.loading = false;
    });
  },
});

export default postSlice.reducer;
