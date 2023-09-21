import { configureStore } from "@reduxjs/toolkit";
import RecipeSlice from "./reducer/RecipeSlice";
import usersSlice from "./reducer/usersSlice";

export const store = configureStore({
  reducer: {
    recipe: RecipeSlice,
    users: usersSlice,
  },
});
