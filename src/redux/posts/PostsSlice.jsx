import  {createSlice ,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = import.meta.env.VITE_baseURL;

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async(token,thunkAPI) =>{
        try {
            const res = await axios(`${baseURL}/posts/getposts`,{
                            headers:{
                                'x-auth-token': token
                            }
                        });
            return res.data;
        } catch (err) {
            console.error(err.message);
        }
    }
);

const PostsSlice = createSlice({
    name :'posts',
    initialState: {
        posts : [],
        status: 'idle',
        error: null
    },
    reducers :{

    },
    extraReducers: (builder) =>{
        builder.addCase(fetchPosts.pending,(state)=>{
            state.status = 'loading'
        }).addCase(fetchPosts.fulfilled,(state,action)=>{
            state.status = 'success';
            state.posts = action.payload;
        }).addCase(fetchPosts.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.payload;
        })
    }
});

export default PostsSlice.reducer;