import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/ApiUrl";
import { toast } from "react-toastify";


export const teamFetch = createAsyncThunk("Teams / Fetch", async(arg, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get("team")
        console.log("TEAMS_RESPONSE",response)
        const result = response.data
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

const teamSlice = createSlice({
    name : "teams",
    initialState : {
        data : [],
        loading : false,
        error : null
    },
    reducers : {},

    extraReducers : (builder) =>{
        builder.addCase(teamFetch.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(teamFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action.payload?.success === true){
                // toast.success(action.payload?.message + "Fetched Successfully")
            }
        })
        builder.addCase(teamFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default teamSlice.reducer