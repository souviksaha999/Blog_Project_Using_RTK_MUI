import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/ApiUrl";
import { toast } from "react-toastify";


export const bannerFetch = createAsyncThunk("Banner/Fetch", async(arg, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get('banner')
        console.log("BANNER_FETCH", response)
        const result = response.data
        return result
    } catch (error) {
        return rejectWithValue(error)
    }

})

const bannerSlice = createSlice({
    name : "banner",
    initialState : {
        data : [],
        loading : false,
        error : null
    },
    reducers : {},

    extraReducers : (builder) =>{
        builder.addCase(bannerFetch.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(bannerFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
           
        })
        builder.addCase(bannerFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})


export default bannerSlice.reducer