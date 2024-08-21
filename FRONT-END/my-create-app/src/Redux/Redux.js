import {configureStore,createSlice} from '@reduxjs/toolkit'  
import adminAuthSlice from './adminAuthSlice'
import userAuth from './userAuth'

const store = configureStore({
    reducer: {
        admin: adminAuthSlice,
        user: userAuth,
      },
}) 

export default store