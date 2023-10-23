import { configureStore } from "@reduxjs/toolkit";
import personReducer from "./personSlice";

export const store = configureStore({
  reducer: {
    person: personReducer,
  },
});

export default store;
