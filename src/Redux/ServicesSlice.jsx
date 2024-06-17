import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/ApiUrl";
import { toast } from "react-toastify";


export const servicesFetch = createAsyncThunk("Services/Fetch", async(arg, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get('service')
        console.log("SERVICES_FETCH", response)
        const result = response.data
        return result
    } catch (error) {
        return rejectWithValue(error)
    }

})

const servicesSlice = createSlice({
    name : "services",
    initialState : {
        data : [],
        loading : false,
        error : null
    },
    reducers : {},

    extraReducers : (builder) =>{
        builder.addCase(servicesFetch.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(servicesFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action.payload.status === "success"){
                // toast.success("Services Fetched Successfully")
            }
        })
        builder.addCase(servicesFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})


export default servicesSlice.reducer