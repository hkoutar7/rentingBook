import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export let fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
    let response = await axios.get(`${BASE_URL}/api/v1/books`);

    return response?.data;
});

export let fetchBook = createAsyncThunk(
    "books/fetchBook",
    async (state, action) => {
        let bookId = state;
        let response = await axios.get(`${BASE_URL}/api/v1/books/${bookId}`);
        return response?.data;
    }
);

export let addBook = createAsyncThunk("books/addBook", 
    async (bookObject) => {
        try {
            let response = await axios.post(`${BASE_URL}/api/v1/books`, bookObject);
            if ( response.data.statusCode === 201){
                return  {
                    data : response.data.data,
                    message : "Success Adding book",
                }
            }
            return {
                data : null,
                message : "Failed To add book" + response.data.message,
            }

        } catch (error) {
            console.log(error);
        }

    }
);

export const deleteBook = createAsyncThunk("books/deleteBook", async (idBook) => {
    
    let response = await axios.delete(`${BASE_URL}/api/v1/books/${idBook}`);

    return response?.data;
})

export const updateBook = createAsyncThunk("books/updateBook", async ( id, bookObject ) => {

    try {
        let response = await axios.put(`${BASE_URL}/api/v1/books/${id}`, bookObject);

        console.log("bookObject");
        console.log(bookObject);
        
        if (response.data.statusCode === 201) {
            return {
                data: response.data.data,
                message: "Success updating book",
            };
        }

        return {
            data: null,
            message: "Failed to update book: " + response.data.message,
        };
    } catch (error) {
        console.error(error);
        throw error; 
    }
});


const initialState = {
    books: [],
    booksNumber: 0,
    status: "",
    error: "",
};


let bookSlice = createSlice({
    name: "books",
    initialState: initialState,
    reducer: {},

    extraReducers(builder) {
        builder
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.books = action.payload.data;
                state.booksNumber = action.payload.data.length;
            })
            .addCase(fetchBook.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.books = action.payload.data;
                state.booksNumber = action.payload.data.length;
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.books.push(action.payload.data);
                state.booksNumber += 1;
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                // state.books.push(action.payload.data);
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                if (action.payload.statusCode === 200) {
                    state.booksNumber = state.booksNumber - 1;
                }
            })
    },
});

export default bookSlice.reducer;


















