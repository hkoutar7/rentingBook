import { configureStore } from "@reduxjs/toolkit";
import authorReducer from "./reducers/authorReducer";

export const store = configureStore({
    reducer: {
        author: authorReducer,
        
    },
});

export default store;
