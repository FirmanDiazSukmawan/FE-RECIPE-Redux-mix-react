import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from "../../baseurl/url";
import axios from "axios";

export const getSavedUsersId = createAsyncThunk(
  "saved/getSavedUsersId",
  async (getId) => {
    try {
      const response = await axios.get(`${url}/saved/users/${getId}`);
      //   console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getSavedUsersIdSlice = createSlice({
  name: "getSavedUsersId",
  initialState: {
    status: "idle",
    loading: false,
    saved: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSavedUsersId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSavedUsersId.fulfilled, (state, action) => {
        state.loading = false;
        state.saved = action?.payload;
      })
      .addCase(getSavedUsersId.rejected, (state, action) => {
        state.loading = false;
        state.saved = action?.payload;
      });
  },
});

export const getSavedUsersIdSelector = (state) => state?.getSavedUsersId?.saved;
export const loadingsavedUsersIdSelector = (state) =>
  state.getSavedUsersId.loading;

export default getSavedUsersIdSlice.reducer;
