import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
const initialState = {
  movies: [],
  movieDetails: null,
  error: null,
  loading: false,
};

const slice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    fetchMovies(state, action) {
      const { payload } = action;
      state.movies = payload;
    },
    fetchMovieDetails(state, action) {
      const { payload } = action;
      state.movieDetails = payload;
    },
    createError(state, action) {
      state.error = action.payload;
    },
    loading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const reducer = slice.reducer;

export const fetchMovies = (searchText) => async (dispatch) => {
  try {
    dispatch(slice.actions.loading(true));
    dispatch(slice.actions.fetchMovies([]));
    const response = await Axios.get(
      `http://www.omdbapi.com/?s=${searchText}&apikey=46b69003&plot=full`
    );
    if (response.status === 200) {
      if (response.data.Search) {
        dispatch(slice.actions.fetchMovies(response.data.Search));
      } else {
        dispatch(slice.actions.createError(response.data.Error));
      }
      dispatch(slice.actions.loading(false));
    }
  } catch (err) {
    return err.message;
  }
};

export const fetchMovieDetails = (id) => async (dispatch) => {
  try {
    dispatch(slice.actions.fetchMovieDetails(null));
    const response = await Axios.get(
      `http://www.omdbapi.com/?i=${id}&apikey=46b69003&plot=full`
    );
    console.log(response, "resp...");
    if (response.status === 200) {
      if (response.data.Error) {
        dispatch(slice.actions.createError(response.data.Error));
      } else {
        dispatch(slice.actions.fetchMovieDetails(response.data));
      }
    }
  } catch (err) {
    return err.message;
  }
};
