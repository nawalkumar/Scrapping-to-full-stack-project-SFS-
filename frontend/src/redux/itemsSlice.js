import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const response = await axios.get('http://localhost:5000/api/data');
    return response.data;
});

const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        data: [],
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

export default itemsSlice.reducer;
