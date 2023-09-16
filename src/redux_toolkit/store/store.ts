import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";

// store configuration for userReducer
export const store = configureStore({
  reducer: { userReducer },
});
