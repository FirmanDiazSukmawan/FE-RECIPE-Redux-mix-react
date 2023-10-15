import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../baseurl/url";
import { toast } from "react-toastify";

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (comment_id) => {
    try {
      const response = await axios.delete(`${url}/comment/${comment_id}`);
      // console.log(response.data);
      return response.data;
    } catch (err) {
      toast.error(err.data.messsage);
    }
  }
);

export const deleteCommentSlice = createSlice({
  name: "deleteComment",
  initialState: {
    status: "idle",
    loading: false,
    comment: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comment = state.comment.filter((item) => item !== action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.comment = action?.payload;
      });
  },
});

export const deleteCommentSelector = (state) => state.deleteComment.comment;
export const loadingcommentUsersIdSelector = (state) =>
  state.deleteComment.loading;

export default deleteCommentSlice.reducer;
