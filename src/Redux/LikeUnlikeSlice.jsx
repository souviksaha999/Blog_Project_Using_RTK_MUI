import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/ApiUrl";


export const Like = createAsyncThunk("Like" , async(id, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.put(`blog/like/${id}`) 
        console.log("LIKE RESPONSE.....", response)
        const result = response.data
        return result     
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const UnLike = createAsyncThunk("UnLike" , async(id, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.put(`blog/unlike/${id}`) 
        console.log("UNLIKE RESPONSE.....", response)
        const result = response.data
        return result     
    } catch (error) {
        return rejectWithValue(error)
    }
})

const LikeUnlikeSlice = createSlice({
    name : "Like_Unlike",
    initialState : {
        data : [],
        loading : false,
        error : null
    },
    reducers : {},

    extraReducers : (builder) => {
        builder.addCase(Like.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(Like.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload 
            // if (action.payload){
            //     window.location.reload()
            // }
        })
        builder.addCase(Like.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload 
            
        })


        builder.addCase(UnLike.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(UnLike.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload 
            // if (action.payload){
            //     window.location.reload()
            // }
        })
        builder.addCase(UnLike.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload 
        })
    }
})

export default LikeUnlikeSlice.reducer