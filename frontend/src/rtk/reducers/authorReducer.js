import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000";


export let fetchAuthors = createAsyncThunk("authors/fetchAuthors", async () => {

    let response = await axios.get(`${BASE_URL}/api/v1/authors`)

    return response?.data;
});

export let fetchAuthor = createAsyncThunk("authors/fetchAuthor", 
    async (state, action) => {
        let authorId = state;
        // let response = await axios.get(`${BASE_URL}/api/v1/authors`);
        console.log(authorId);
        // return response?.data;
    }
);

export const deleteAuthor = createAsyncThunk("authors/deleteAuthor", async (idAuthor) => {
    
    let response = await axios.delete(`${BASE_URL}/api/v1/authors/${idAuthor}`);

    return response?.data;
})

export let addAuthor = createAsyncThunk("authors/addAuthor", 
    async (authorObject) => {
        try {
            let response = await axios.post(`${BASE_URL}/api/v1/authors`, authorObject);
            if ( response.data.statusCode === 201){
                return  {
                    data : response.data.data,
                    message : "Success Adding author",
                }
            }
            return {
                data : null,
                message : "Failed To add author" + response.data.message,
            }

        } catch (error) {
            console.log(error);
        }

    }
);



const initialState = {
    authors: [],
    authorsNumber: 0,
    status: "nah",
    error: "",
};

let authorSlice = createSlice({

    name : "authors",
    initialState : initialState ,
    reducer : {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchAuthors.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchAuthors.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.authors = action.payload.data;
                state.authorsNumber = action.payload.data.length;
            })
            .addCase(fetchAuthors.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteAuthor.fulfilled, (state, action) => {
                if (action.payload.statusCode === 200) {
                    // const newAuthors = state.authors.filter((author) => {
                    //     return author._id !== action.meta.arg;
                    // });
                    // state.authors = newAuthors;
                    // console.log(newAuthors);
                    state.authorsNumber -= 1;
                }
            })
            .addCase(addAuthor.fulfilled , (state, action) => {
                state.authors.push(action.payload.data);
                state.authorsNumber += 1;
            });
    },

});

export default authorSlice.reducer;