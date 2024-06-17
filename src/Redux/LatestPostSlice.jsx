import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/ApiUrl";
import { toast } from "react-toastify";


export const latestPostFetch = createAsyncThunk("LatestPost / Fetch", async(arg, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get("letest-post")
        console.log("LATEST_POST_RESPONSE",response)
        const result = response.data
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

const latestPostSlice = createSlice({
    name : "latestPost",
    initialState : {
        data : [],
        loading : false,
        error : null
    },
    reducers : {},

    extraReducers : (builder) =>{
        builder.addCase(latestPostFetch.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(latestPostFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action.payload?.success === true){
                toast.success(action.payload?.message + "Fetched Successfully")
            }
        })
        builder.addCase(latestPostFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default latestPostSlice.reducer