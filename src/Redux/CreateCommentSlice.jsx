import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/ApiUrl";


export const createComment = createAsyncThunk("Create / Comment",async({id,user},{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post(`blog/${id}/comment/create`, user)
        console.log("CREATE_COMMENTS_RESPONSE.......", response )
        const result = response.data
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})


const createCommentSlice = createSlice({
    name : "createComment",
    initialState : {
        data : [],
        loading : false,
        error : null
    },
    reducers : {},

    extraReducers : (builder) =>{
        builder.addCase(createComment.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(createComment.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
        })
        builder.addCase(createComment.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default createCommentSlice.reducer
