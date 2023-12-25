import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000";


export let fetchAuthors = createAsyncThunk("book/fetchAuthors", async () => {

    let response = await axios.get(`${BASE_URL}/api/v1/authors`)

    return response?.data;
});







const initialState = {
    authors: [],
    authorsNumber: 0,
    status: "nah",
    error: "",
};

let bookSlice = createSlice({

    name : "authors",
    initialState : initialState,
    reducer : {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchAuthors.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchAuthors.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.authors = action.payload;
            })
            .addCase(fetchAuthors.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },

});

export default bookSlice.reducer;