import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/ApiUrl";
import { toast } from "react-toastify";


export const coursesFetch = createAsyncThunk("Courses / Fetch", async(arg, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get("course")
        console.log("COURSES_RESPONSE",response)
        const result = response.data
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

const coursesSlice = createSlice({
    name : "courses",
    initialState : {
        data : [],
        loading : false,
        error : null
    },
    reducers : {},

    extraReducers : (builder) =>{
        builder.addCase(coursesFetch.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(coursesFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action.payload?.success === true){
                toast.success(action.payload?.message + "Fetched Successfully")
            }
        })
        builder.addCase(coursesFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default coursesSlice.reducer