import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/ApiUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const registerUser = createAsyncThunk("Register / User", async(user, {rejectWithValue})=>{

    try {
        const response = await axiosInstance.post("register",user)
        console.log("REGISTER", response)
        if (response?.data?.success === true){
            // window.location.href = "/login";
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


const registerSlice = createSlice({
    name : "register",
    initialState : {
        user : {},
        loading : false,
        error : null
    },
    reducers : {},

    extraReducers : (builder)=>{
        builder.addCase(registerUser.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(registerUser.fulfilled, (state,action)=>{
            state.loading = false;
            state.user = action.payload

            if (action.payload.success === true){
                toast.success(action.payload.message)
            }
        })
        builder.addCase(registerUser.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            if (action.payload) {
                toast.error(action.payload.message)  
                toast.error(action.payload.response.data)  
                toast.error(action.payload.response.data.msg)
            }
        })
    }

})

export default registerSlice.reducer