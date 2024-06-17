import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/ApiUrl";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";


export const updatePassword = createAsyncThunk("UpdatePassword ", async(user, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.post("update-password",user)
        console.log("UPDATE_PASSWORD", response)
        const result = response.data
        return result
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

const updatePasswordSlice = createSlice({
    name : "updatePassword",
    initialState : {
        user : {},
        loading : false,
        error : null,
    },
    reducers : {},

    extraReducers : (builder)=>{
        builder.addCase(updatePassword.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(updatePassword.fulfilled, (state,action)=>{
            state.loading = false;
            state.user = action.payload
            if (action.payload.success === true){
                toast.success(action.payload.msg)
                // state.submitLoad = false
                // useNavigate("/")
            }
        })
        builder.addCase(updatePassword.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            console.log("PAYLOAD.....",action.payload)
            if (action.payload) {
                toast.error(action.payload.message)  
                toast.error(action.payload.response.data) 
                toast.error(action.payload.response.data.msg)
                // state.submitLoad = false
            }
        })
    }

})

export default updatePasswordSlice.reducer