import { configureStore } from "@reduxjs/toolkit";
import authorReducer from "./reducers/authorReducer";
import bookReducer from "./reducers/bookReducer";

export const store = configureStore({
    reducer: {
        author: authorReducer,
        book: bookReducer,
        
    },
});

export default store;
