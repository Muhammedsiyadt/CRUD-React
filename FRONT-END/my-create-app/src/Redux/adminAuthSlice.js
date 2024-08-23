import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: {
    status: localStorage.getItem("admintoken") ? true : false,
  },
};  

const adminAuthSlice = createSlice({
  name: "admin",
  initialState,

  reducers: {
    adminLogin: (state, action) => {
      state.admin.status = true, 
      localStorage.setItem('admintoken', action.payload);
    },
    adminLogout: (state, action) => {
      state.admin.status = false
      localStorage.removeItem('admintoken'); 
    },
  },
});

export const { adminLogin , adminLogout} = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
