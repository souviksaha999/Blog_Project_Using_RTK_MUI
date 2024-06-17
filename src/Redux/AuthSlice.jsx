import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/ApiUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const registerUser = createAsyncThunk("Register / User", async (user, { rejectWithValue }) => {

    try {
        const response = await axiosInstance.post("register", user)
        console.log("REGISTER", response)
        // if (response?.data?.success === true){
        //     window.location.href = "/login";
        // }
        const result = response.data
        return result
    } catch (error) {
        console.log(error)
        // toast.error(error.message)
        // toast.error(error.response.data.msg)
        return rejectWithValue(error)
    }
})

export const loginUser = createAsyncThunk("Login / User", async (user, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("login", user)
        console.log("LOGIN", response)
        // if (response?.data?.status === 200){
        // setTimeout(() => {
        //     window.location.href = "/allblogs";
        // }, 3000);
        //     window.location.href = "/allblogs";
        // }
        const result = response.data
        return result
    } catch (error) {
        console.log(error)
        // toast.error(error.message)
        // toast.error(error.response.data.msg)
        return rejectWithValue(error)
    }
})


const authSlice = createSlice({
    name: "member",
    initialState: {
        UserData: {},
        loading: false,
        error: null,
        redirectReg: null,
        LogoutToggle: false,
        redirectTo: null,
        redirectToor: null
    },

    // In Redux, reducers are pure functions that handle state logic, accepting the initial state and action type to update and return the state, facilitating changes in React view components.

    reducers: {  

        //logout
        logout: (state, action) => { 
            localStorage.removeItem("name");
            localStorage.removeItem("token");
            state.LogoutToggle = false
        },
        //for register page redirect after login logout
        regLogOut: (state, { payload }) => {
            localStorage.removeItem("name")
        },
        //for check token
        check_token: (state, { payload }) => {
            let token = localStorage.getItem("token");
            if (token !== null && token !== undefined) {
                state.LogoutToggle = true;
            }
        },
        //for login redirect condition
        redirectToo: (state, { payload }) => {
            state.redirectTo = payload
        },
        //for dashboard redirect condition
        redirectTooe: (state, action) => {
            state.redirectToor = action.payload
        },
    },

    extraReducers: (builder) => {
        
        builder.addCase(registerUser.pending, (state,action)=>{
            state.loading = true
        })
        builder.addCase(registerUser.fulfilled, (state,action)=>{
            state.loading = false;
            state.UserData = action.payload
            if (action?.payload?.success === true){
                localStorage.setItem("name", action?.payload?.data?.name)
                state.redirectTo = "/login"
                toast.success(action?.payload?.message)
            }
        })
        builder.addCase(registerUser.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            if (action.payload) {
                toast(action.payload.message)  
                toast.error(action.payload.response.data) 
                toast.error(action.payload.response.data.msg) 
            }
        })

        

        builder.addCase(loginUser.pending, (state,action)=>{
            state.loading = true
        })

        builder.addCase(loginUser.fulfilled, (state,action)=>{
            state.loading = false;
            state.UserData = action.payload
            if (action?.payload?.status === 200){
                localStorage.setItem("token", action?.payload?.token)
                localStorage.setItem("name", action?.payload?.user?.name)
                state.redirectToor = "/"
                state.LogoutToggle = true
                toast.success(action?.payload?.message)
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
            }
        })

    }
})

export const { logout, LogoutUser, check_token, redirectToo, redirectTooe, regLogOut } = authSlice.actions

export default authSlice.reducer
