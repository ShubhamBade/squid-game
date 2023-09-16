import { createSlice } from "@reduxjs/toolkit";

// initial user data for user
const initialState = {
  user: {
    name: "",
    email: "",
    mobileNumber: "",
    difficultyLevel: "", //  ENUM Values - Easy, Medium, Hard
    previousRecords: [
      {
        score: 0,
        result: "", // ENUM Values - Win Loose
      },
    ],
  },
};

//updating user data
export const saveUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { saveUserData } = saveUserSlice.actions;
export default saveUserSlice.reducer;
