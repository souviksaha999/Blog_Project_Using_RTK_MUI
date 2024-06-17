import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/ApiUrl";
import { toast } from "react-toastify";


export const showCommentsFetch = createAsyncThunk("Show_Comments / Fetch", async(id)=>{
    try {
        const response = await axiosInstance.get(`comment/${id}`)
        console.log("SHOW_COMMENTS_FETCH", response)
        const result = response.data
        return result
    } catch (error) {
        return error
    }
})


const showCommentsSlice = createSlice({
    name : "showComments",
    initialState : {
        data : [],
        loading : false,
        error : null
    },
    reducers : {},

    extraReducers : (builder) =>{
        builder.addCase(showCommentsFetch.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(showCommentsFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action.payload?.success === true){
                toast.success(action.payload?.message + "Fetched Successfully")
            }
        })
        builder.addCase(showCommentsFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})


export default  showCommentsSlice.reducer