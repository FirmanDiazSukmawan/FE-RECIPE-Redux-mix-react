import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../baseurl/url";
import { toast } from "react-toastify";

export const deleteSaved = createAsyncThunk(
  "saved/deleteSaved",
  async (saved_id) => {
    try {
      const response = await axios.delete(`${url}/saved/${saved_id}`);
      // console.log(response.data);
      return response.data;
    } catch (err) {
      toast.error(err.data.messsage);
    }
  }
);

export const deleteSavedSlice = createSlice({
  name: "deleteSaved",
  initialState: {
    status: "idle",
    loading: false,
    saved: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteSaved.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSaved.fulfilled, (state, action) => {
        state.loading = false;
        state.saved = state.saved.filter((item) => item !== action.payload);
      })
      .addCase(deleteSaved.rejected, (state, action) => {
        state.loading = false;
        state.saved = action?.payload;
      });
  },
});

export const deleteSavedSelector = (state) => state.deleteSaved.saved;
export const loadingsavedUsersIdSelector = (state) => state.deleteSaved.loading;

export default deleteSavedSlice.reducer;
