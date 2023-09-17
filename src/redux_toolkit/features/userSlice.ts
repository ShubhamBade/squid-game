import { createSlice } from "@reduxjs/toolkit";

// initial user data for user
const initialState = {
  user: {
    name: "",
    email: "",
    mobileNumber: "",
    difficultyLevel: "", //  ENUM Values 
    previousRecords: [
      {
        score: 10,
        level:"LEVEL EASY",
        result: "WIN", // ENUM Values - WIN LOOSE
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
      console.log(action.payload)
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { saveUserData } = saveUserSlice.actions;
export default saveUserSlice.reducer;
