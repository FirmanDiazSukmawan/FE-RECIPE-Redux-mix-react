import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../baseurl/url";
import { toast } from "react-toastify";

const initialState = {
  users: [],
  status: "idle",
  isLoading: false,
};

export const getUsersById = createAsyncThunk(
  "users/getUsersById",
  async (getId) => {
    const response = await axios.get(`${url}/users/${getId}`);

    return response.data;
    // console.log(response);
  }
);

export const updateUsers = createAsyncThunk(
  "users/updateUsers",
  async ({ getId, data, saveImage }) => {
    const formDataToSend = new FormData();
    formDataToSend.append("username", data.username);
    formDataToSend.append("phone_number", data.phone_number);
    formDataToSend.append("image", saveImage);

    try {
      const response = await axios.put(`${url}/users/${getId}`, formDataToSend);
      if (!response?.data) {
        toast.error("please try again");
      } else {
        toast.success("Update Successfully");

        setTimeout(() => {
          window.location.reload();
        }, 500);
        return response?.data;
      }
    } catch (error) {
      toast.error("Error updating Profile");
      setTimeout(() => {
        window.location.reload();
      }, 500);
      throw error;
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersById.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(getUsersById.fulfilled, (state, action) => {
        state.status = "success";
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(getUsersById.rejected, (state, action) => {
        state.status = "failed";
        state.users = action.error.message;
        state.isLoading = false;
      })

      .addCase(updateUsers.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(updateUsers.fulfilled, (state, action) => {
        state.status = "success";
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUsers.rejected, (state, action) => {
        state.status = "failed";
        state.users = action.error.message;
        state.isLoading = false;
      });
  },
});

export const usersSelector = (state) => state.users.users.data;
export const isLoadingSelector = (state) => state.users.isLoading;
export default usersSlice.reducer;
