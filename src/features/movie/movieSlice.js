import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
  nominations: [],
  fiveSelected: false,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload.searchResults;
    },
    setNominations: (state, action) => {
      state.nominations = action.payload.nominations;
    },
  },
});

export const { setSearchResults, setNominations } = movieSlice.actions;

export const selectSearchResults = (state) => state.movie.searchResults;
export const selectNominations = (state) => state.movie.nominations;

export default movieSlice.reducer;
