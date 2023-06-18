import { combineReducers } from '@reduxjs/toolkit'
import { contactSlice } from '@/store/slice/contact'

const reducers = combineReducers({
  [contactSlice.name]: contactSlice.reducer,
  
})

export default reducers