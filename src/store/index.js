import { configureStore } from "@reduxjs/toolkit";
import reducers from "@/store/reducers";

const store = configureStore({reducer: reducers})

export default store