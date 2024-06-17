import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/ApiUrl";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";


export const loginUser = createAsyncThunk("Login / User", async(user, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.post("login",user)
        console.log("LOGIN", response)
        if (response?.data?.status === 200){
            // setTimeout(() => {
            //     window.location.href = "/allblogs";
            // }, 3000);
            window.location.href = "/allblogs";
        }
        const result = response.data
        return result
    } catch (error) {
        console.log(error)
        // toast.error(error.message)
        // toast.error(error.response.data.msg)
        return rejectWithValue(error)
    }
})

const loginSlice = createSlice({ 
    name : "login",
    initialState : {
        user : {},
        loading : false,
        error : null,
    },
    reducers : {}, 

    extraReducers : (builder)=>{
        builder.addCase(loginUser.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(loginUser.fulfilled, (state,action)=>{
            state.loading = false;
            state.user = action.payload
            if (action.payload.status === 200){
                toast.success(action.payload.message)
                state.submitLoad = false
                // useNavigate("/")
            }
        })
        builder.addCase(loginUser.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            console.log("PAYLOAD.....",action.payload)
            if (action.payload) {
                toast.error(action.payload.message)  
                toast.error(action.payload.response.data) 
                toast.error(action.payload.response.data.msg)
                state.submitLoad = false
            }
        })
    }

})

export default loginSlice.reducer