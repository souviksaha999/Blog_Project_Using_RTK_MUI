import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../AxiosInstance/ApiUrl";
import { toast } from "react-toastify";


export const fetchBlogs = createAsyncThunk("Blogs / Fetch", async (arg, { rejectWithValue }) => {
    try {
        // const response = await axios.get("https://restapinodejs.onrender.com/api/allBlog")
        const response = await axiosInstance.get("allBlog")
        console.log("BLOG_FETCH", response)
        const result = response.data.data
        return result
    } catch (error) {
        return rejectWithValue(error)
    }

})

const blogSlice = createSlice({
    name : "blogs",
    initialState : {
        data :[],
        loading : false,
        error : null
    },
    reducers : {},

    extraReducers : (builder)=>{
        builder.addCase(fetchBlogs.pending, (state)=>{
            state.loading = true
        }) 
        builder.addCase(fetchBlogs.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action.payload) {
                toast.success("Fetched Successfully")
            }
        }) 
        builder.addCase(fetchBlogs.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            if (action.payload){
                // toast.error(action.payload.message)
                // toast.error(action.payload.response.data)
            }
        }) 
       }
})

export default blogSlice.reducer