import {configureStore,createSlice} from '@reduxjs/toolkit'  
import adminAuthSlice from './adminAuthSlice'

const store = configureStore({
    reducer: {
        admin: adminAuthSlice,
      },
}) 

export default store