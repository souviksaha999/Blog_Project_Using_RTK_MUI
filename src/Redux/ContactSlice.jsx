import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/ApiUrl";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";


export const contactUs = createAsyncThunk("Contact_Us ", async(user, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.post("contact/create",user)
        console.log("CONTACT_US......", response)
        const result = response.data
        return result
    } catch (error) {
        console.log(error)
        // toast.error(error.message)
        // toast.error(error.response.data.msg)
        return rejectWithValue(error)
    }
})

const contactUsSlice = createSlice({
    name : "contactUs",
    initialState : {
        user : {},
        loading : false,
        error : null
    },
    reducers : {},

    extraReducers : (builder)=>{
        builder.addCase(contactUs.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(contactUs.fulfilled, (state,action)=>{
            state.loading = false;
            state.user = action.payload
            if (action.payload.success === true){
                toast.success(action.payload.message)
                // useNavigate("/")
            }
        })
        builder.addCase(contactUs.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            console.log("PAYLOAD.....",action.payload)
            if (action.payload) {
                toast.error(action.payload.message)  
                toast.error(action.payload.response.data) 
                toast.error(action.payload.response.data.message)
            }
        })
    }

})

export default contactUsSlice.reducer