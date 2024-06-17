import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/ApiUrl";
import { toast } from "react-toastify";


export const testimonialFetch = createAsyncThunk("Testimonials / Fetch", async(arg, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get("testimonial")
        console.log("TESTIMONIAL_RESPONSE",response)
        const result = response.data
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

const testimonialSlice = createSlice({
    name : "testimonials",
    initialState : {
        data : [],
        loading : false,
        error : null
    },
    reducers : {},

    extraReducers : (builder) =>{
        builder.addCase(testimonialFetch.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(testimonialFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action.payload?.success === true){
                // toast.success(action.payload?.message + "Fetched Successfully")
            }
        })
        builder.addCase(testimonialFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default testimonialSlice.reducer