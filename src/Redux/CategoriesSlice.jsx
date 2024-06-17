import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/ApiUrl";
import { toast } from "react-toastify";


export const categoriesFetch = createAsyncThunk("Categories / Fetch", async(arg, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get("showallcategory")
        console.log("CATEGORIESS_RESPONSE",response)
        const result = response.data
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

const categoriesSlice = createSlice({
    name : "categories",
    initialState : {
        data : [],
        loading : false,
        error : null
    },
    reducers : {},

    extraReducers : (builder) =>{
        builder.addCase(categoriesFetch.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(categoriesFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            
        })
        builder.addCase(categoriesFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default categoriesSlice.reducer