import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: {
    status: false,
  },
};

const adminAuthSlice = createSlice({
  name: "admin",
  initialState,

  reducers: {
    adminLogin: (state, action) => {
      state.admin.status = true, 
      console.log(action.payload);
    },
    adminLogout: (state, action) => {
      state.admin.status = false
      console.log(action.payload);
      
    },
  },
});

export const { adminLogin , adminLogout} = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
