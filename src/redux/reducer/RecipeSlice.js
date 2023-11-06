import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../baseurl/url";
import { toast } from "react-toastify";

const initialState = {
  recipe: [],
  recipeUsersId: [],
  status: "idle",
  loading: false,
};

export const getRecipe = createAsyncThunk("recipe/getRecipe", async () => {
  const response = await axios.get(`${url}/recipe`);
  return response.data;
});

export const getRecipeId = createAsyncThunk(
  "recipe/getRecipeId",
  async (recipes_id) => {
    const response = await axios.get(`${url}/recipe/${recipes_id}`);
    return response.data;
  }
);

export const getRecipeUsersId = createAsyncThunk(
  "recipe/getRecipeUsersId",
  async (getId) => {
    const response = await axios.get(`${url}/recipe/user/${getId}`);
    // console.log(response?.data);
    return response?.data;
  }
);

export const createRecipe = createAsyncThunk(
  "recipe/createRecipe",
  async ({ data, saveImage, saveVideo }) => {
    const formDataToSend = new FormData();
    formDataToSend.append("name_recipes", data.name_recipes);
    formDataToSend.append("image", saveImage);
    formDataToSend.append("video", saveVideo);
    formDataToSend.append("name_video", data.name_video);
    formDataToSend.append("ingredients", data.ingredients);
    formDataToSend.append("users_id", data.users_id);
    try {
      const response = await axios.post(`${url}/recipe`, formDataToSend);
      toast.success("Recipe created successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      // console.log(formDataToSend);
      return response.data;
    } catch (error) {
      toast.error("error creating recipe", error);
      setTimeout(() => {
        window.location.reload();
      }, 500);
      console.error(error);
    }
  }
);

export const updateRecipe = createAsyncThunk(
  "recipe/updateRecipe",
  async ({ recipes_id, data, saveImage, saveVideo }) => {
    const formDataToSend = new FormData();
    formDataToSend.append("name_recipes", data?.name_recipes);
    formDataToSend.append("image", saveImage);
    formDataToSend.append("video", saveVideo);
    formDataToSend.append("name_video", data.name_video);
    formDataToSend.append("ingredients", data?.ingredients);

    try {
      const response = await axios.put(
        `${url}/recipe/${recipes_id}`,
        formDataToSend
      );

      if (!response?.data) {
        toast.error("please try again");
      } else {
        toast.success("Update Successfully");

        setTimeout(() => {
          window.location.reload();
        }, 1000);
        return response?.data;
      }
    } catch (error) {
      toast.error("update failed", error);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      throw error;
    }
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipe/deleteRecipe",
  async ({ recipes_id }) => {
    try {
      const response = await axios.delete(`${url}/recipe/${recipes_id}`);
      if (!response?.data) {
        toast.error("please try again");
      } else {
        toast.success("recipe deleted successfully");

        setTimeout(() => {
          window.location.reload();
        }, 1000);
        console.log(response?.data);
        return response?.data;
      }
    } catch (err) {
      toast.error("delete recipe Failed", err);
    }
  }
);

export const RecipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecipe.pending, (state) => {
        state.status = true;
      })
      .addCase(getRecipe.fulfilled, (state, action) => {
        state.status = false;
        state.recipe = action.payload;
      })
      .addCase(getRecipe.rejected, (state, action) => {
        state.status = false;
        state.recipe = action.error.message;
      })
      .addCase(getRecipeId.pending, (state) => {
        state.status = true;
      })
      .addCase(getRecipeId.fulfilled, (state, action) => {
        state.status = false;
        state.recipe = action.payload;
      })
      .addCase(getRecipeId.rejected, (state, action) => {
        state.status = false;
        state.recipe = action.error.message;
      })
      .addCase(getRecipeUsersId.pending, (state) => {
        state.status = true;
      })
      .addCase(getRecipeUsersId.fulfilled, (state, action) => {
        state.status = false;
        state.recipeUsersId = action.payload;
      })
      .addCase(getRecipeUsersId.rejected, (state, action) => {
        state.status = false;
        state.recipeUsersId = action.error.message;
      })
      .addCase(createRecipe.pending, (state) => {
        state.status = true;
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.status = false;
        state.recipe = action.payload;
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.status = false;
        state.recipe = action.error.message;
      })
      .addCase(updateRecipe.pending, (state) => {
        state.status = true;
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        state.status = false;
        state.recipe = action.payload;
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        state.status = false;
        state.recipe = action.error.message;
      })
      .addCase(deleteRecipe.pending, (state) => {
        state.status = true;
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.status = false;
        state.recipe = state.recipe.filter((item) => item !== action.payload);
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.status = false;
        state.recipe = action.error.message;
      });
  },
});

export const recipeSelector = (state) => state.recipe?.recipe;
export const recipeUsersIdSelector = (state) => state.recipe.recipeUsersId;
export const loadingSelector = (state) => state.recipe?.loading;
// console.log(recipeSelect);
export default RecipeSlice.reducer;
