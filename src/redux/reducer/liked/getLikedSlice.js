import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from "../../baseurl/url";
import axios from "axios";

export const getLikedUsersId = createAsyncThunk(
  "liked/getLikedUsersId",
  async (getId) => {
    try {
      const response = await axios.get(`${url}/liked/users/${getId}`);
    //   console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getLikedUsersIdSlice = createSlice({
  name: "getLikedUsersId",
  initialState: {
    status: "idle",
    loading: false,
    liked: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLikedUsersId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLikedUsersId.fulfilled, (state, action) => {
        state.loading = false;
        state.liked = action?.payload;
      })
      .addCase(getLikedUsersId.rejected, (state, action) => {
        state.loading = false;
        state.liked = action?.payload;
      });
  },
});

export const getLikedUsersIdSelector = (state) => state?.getLikedUsersId?.liked;
export const loadingLikedUsersIdSelector = (state) =>
  state.getLikedUsersId.loading;

export default getLikedUsersIdSlice.reducer;
