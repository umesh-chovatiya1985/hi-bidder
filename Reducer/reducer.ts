import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auctionPhotos: [],
};

const photoSlice = createSlice({
    name: "auctionphotos",
    initialState,
    reducers: {
        addPhotos: (state, action) => {
            let find = state.auctionPhotos.findIndex((item) => item.indexKey === action.payload.indexKey);
            if (find >= 0) {
                state.auctionPhotos[find] = action.payload;
            } else {
                state.auctionPhotos.push(action.payload);
            }
        },
        removePhotos: (state, action) => {
            let find = state.auctionPhotos.findIndex((item) => item.indexKey === action.payload.indexKey);
            if (find >= 0) {
                state.auctionPhotos.splice(find, 1);
            }
            state;
        },
        getAllPhotos: (state) => {
            state;
        }
    }
});

export const {
    addPhotos,
    removePhotos,
    getAllPhotos
} = photoSlice.actions;

export default photoSlice.reducer;