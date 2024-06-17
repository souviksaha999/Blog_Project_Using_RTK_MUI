import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/ApiUrl";
import { toast } from "react-toastify";


export const blogDetailsFetch = createAsyncThunk("Blog_Details / Fetch", async(id)=>{
    try {
        const response = await axiosInstance.get(`blogdetails/${id}`)
        console.log("BLOG_DETAILS_FETCH", response)
        const result = response.data
        return result
    } catch (error) {
        return error
    }
})



const blogDetailsSlice = createSlice({
    name : "blogDetails",
    initialState : {
        data : [],
        loading : false,
        error : null
    },
    reducers : {},

    extraReducers : (builder) =>{
        builder.addCase(blogDetailsFetch.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(blogDetailsFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action.payload?.success === true){
                toast.success(action.payload?.message + "Fetched Successfully")
            }
        })
        builder.addCase(blogDetailsFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})



export default blogDetailsSlice.reducer
