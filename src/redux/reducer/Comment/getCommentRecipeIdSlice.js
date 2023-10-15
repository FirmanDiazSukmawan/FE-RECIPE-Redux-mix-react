import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from "../../baseurl/url";
import axios from "axios";

export const getCommentRecipeId = createAsyncThunk(
  "comment/getCommentRecipeId",
  async (recipes_id) => {
    try {
      const response = await axios.get(`${url}/comment/recipe/${recipes_id}`);
      //   console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getCommentRecipeIdSlice = createSlice({
  name: "getCommentRecipeId",
  initialState: {
    status: "idle",
    loading: false,
    comment: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentRecipeId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCommentRecipeId.fulfilled, (state, action) => {
        state.loading = false;
        state.comment = action?.payload;
      })
      .addCase(getCommentRecipeId.rejected, (state, action) => {
        state.loading = false;
        state.comment = action?.payload;
      });
  },
});

export const getCommentRecipeIdSelector = (state) =>
  state?.getCommentRecipeId?.comment;
export const loadingCommentUsersIdSelector = (state) =>
  state.getCommentRecipeId.loading;

export default getCommentRecipeIdSlice.reducer;
