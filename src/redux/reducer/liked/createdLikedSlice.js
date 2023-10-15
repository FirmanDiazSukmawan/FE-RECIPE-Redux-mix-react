import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../../baseurl/url";

export const createLiked = createAsyncThunk(
  "liked/createLiked",
  async ({ users_id, recipes_id }) => {
    try {
      const response = await axios.post(`${url}/liked/`, {
        users_id: users_id,
        recipes_id: recipes_id,
      });
      toast.success("you liked the recipe");
      return response.data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }
);

export const createLikedSlice = createSlice({
  name: "createLiked",
  initialState: {
    status: "idle",
    loading: false,
    liked: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLiked.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLiked.fulfilled, (state, action) => {
        state.loading = false;
        state.liked = action?.payload;
      })
      .addCase(createLiked.rejected, (state, action) => {
        state.loading = false;
        state.liked = action?.payload;
      });
  },
});

export const createLikedSelector = (state) => state.createLiked.liked;
export const loadingLikedUsersIdSelector = (state) => state.createLiked.loading;

export default createLikedSlice.reducer;
