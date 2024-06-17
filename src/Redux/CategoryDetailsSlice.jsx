import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/ApiUrl";
import { toast } from "react-toastify";


export const catgDetailsFetch = createAsyncThunk("Catg_Details / Fetch", async(id)=>{
    try {
        const response = await axiosInstance.get(`category/post/${id}`)
        console.log("CATG_DETAILS_FETCH", response)
        const result = response.data
        return result
    } catch (error) {
        return error
    }
})

const catgDetailsSlice = createSlice({
    name : "catgDetails",
    initialState : {
        data : [],
        loading : false,
        error : null
    },
    reducers : {},

    extraReducers : (builder) =>{
        builder.addCase(catgDetailsFetch.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(catgDetailsFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action.payload?.success === true){
                toast.success(action.payload?.message + "Fetched Successfully")
            }
        })
        builder.addCase(catgDetailsFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default catgDetailsSlice.reducer