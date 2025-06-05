import { createSlice } from "@reduxjs/toolkit";

const UsersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        status:'idle',
        error: null
    },
    reducers: {}
});
export default UsersSlice.reducer;