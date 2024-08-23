import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    status: localStorage.getItem("usertoken") ? true : false,
  },
};

const UserAuthSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    userLogin: (state, action) => {
      state.user.status = true;
      localStorage.setItem('usertoken', action.payload);
    },
    userLogout: (state, action) => {
      state.user.status = false;
      console.log(action.payload); 
      localStorage.removeItem('usertoken');
    },
  },
});

export const { userLogin, userLogout } = UserAuthSlice.actions;
export default UserAuthSlice.reducer;
