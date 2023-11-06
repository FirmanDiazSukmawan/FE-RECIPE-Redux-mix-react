import { configureStore } from "@reduxjs/toolkit";
import RecipeSlice from "./reducer/RecipeSlice";
import getLikedUsersIdSlice from "./reducer/liked/getLikedSlice";
import getSavedUsersIdSlice from "./reducer/Saved/getSavedSlice";
import deleteLikedSlice from "./reducer/liked/deleteLikedSlice";
import deleteSavedSlice from "./reducer/Saved/deleteSavedSlice";
import createdLikedSlice from "./reducer/liked/createdLikedSlice";
import createSavedSlice from "./reducer/Saved/createSavedSlice";
import getCommentRecipeIdSlice from "./reducer/Comment/getCommentRecipeIdSlice";
import createCommentSlice from "./reducer/Comment/createCommentSlice";
import deleteCommentSlice from "./reducer/Comment/deleteCommentSlice";
import updateUsersSlice from "./reducer/users/updateUsers";
import getUsersIdSlice from "./reducer/users/getUsersIdSlice";

export const store = configureStore({
  reducer: {
    recipe: RecipeSlice,
    // recipeUserId: RecipeSlice,
    updateUsers: updateUsersSlice,
    getUsersId: getUsersIdSlice,
    getLikedUsersId: getLikedUsersIdSlice,
    createdLiked: createdLikedSlice,
    deleteLiked: deleteLikedSlice,
    getSavedUsersId: getSavedUsersIdSlice,
    createSaved: createSavedSlice,
    deleteSaved: deleteSavedSlice,
    getCommentRecipeId: getCommentRecipeIdSlice,
    createComment: createCommentSlice,
    deleteComment: deleteCommentSlice,
  },
});
