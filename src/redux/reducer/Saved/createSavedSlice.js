import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../../baseurl/url";

export const createSaved = createAsyncThunk(
  "saved/createSaved",
  async ({ users_id, recipes_id }) => {
    try {
      const response = await axios.post(`${url}/saved/`, {
        users_id: users_id,
        recipes_id: recipes_id,
      });
      toast.success("you saved the recipe");
      return response.data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }
);

export const createSavedSlice = createSlice({
  name: "createSaved",
  initialState: {
    status: "idle",
    loading: false,
    saved: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSaved.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSaved.fulfilled, (state, action) => {
        state.loading = false;
        state.saved = action?.payload;
      })
      .addCase(createSaved.rejected, (state, action) => {
        state.loading = false;
        state.saved = action?.payload;
      });
  },
});

export const createSavedSelector = (state) => state.createSaved.saved;
export const loadingsavedUsersIdSelector = (state) => state.createSaved.loading;

export default createSavedSlice.reducer;
