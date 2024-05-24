import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ServerUrl} from "@/app/constant.mjs";

type Movies = {
  genres: { id: number, name: string }[];
  movies: { results: Inform[], page: number, total_pages: number };
  page: number;
  sort: string;
  selectGenres: string[];
  releaseYear: string | null;
  ratingFrom: number | string;
  ratingTo: number | string;
  loader: boolean;
  error: boolean;
  isModal: boolean;
  dataMovie: Inform;
  movieInform: MovieInform
}
type MovieInform = {
  original_title: string,
  poster_path: string,
  release_date: string,
  vote_average: number,
  vote_count: number,
  runtime: number,
  budget: number,
  revenue: number,
  genres: { id: number, name: string }[],
  overview: string,
  production_companies: {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
  }[],
  videos: {
    results:
      {
        name: string,
        key: string,
        site: string,
        id: string
      }[]
  }
  error: boolean;
}
type Inform = {
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
};

export const getGenres = createAsyncThunk<Movies>(
  "movies/getGenres",
  async () => {
    const response = await fetch(ServerUrl + "/genres");
    return await response.json();
  }
);
export const getMovies = createAsyncThunk<{ results: Inform[], page: number, total_pages: number }, { genres: number[], releaseYear: number, ratingFrom: number, ratingTo: number, sortMovie: string, page: number }>(
  "movies/getMovies",
  async (value: { genres: number[], releaseYear: number, ratingFrom: number, ratingTo: number, sortMovie: string, page: number }) => {
    const response = await fetch(ServerUrl + `/movies/${value.sortMovie}/${value.page}`, {
      method: "POST",
      body: JSON.stringify({
        genres: value.genres,
        releaseYear: value.releaseYear,
        ratingFrom: value.ratingFrom,
        ratingTo: value.ratingTo
      })
    });
    return await response.json();
  }
);
export const getMovie = createAsyncThunk<MovieInform, number>(
  "movies/getMovie",
  async (id: number) => {

    const response = await fetch(ServerUrl + "/getInformMovie/" + id);
    return await response.json();
  }
);
const initialState: Movies = {
  genres: [{id: 0, name: ""}],
  movies: {
    results: [{
      id: 0,
      original_title: "",
      poster_path: "",
      release_date: "",
      vote_average: 0,
      vote_count: 0,
      genre_ids: [0],
    }],
    page: 0,
    total_pages: 0
  },
  page: 1,
  sort: "Most Popular",
  selectGenres: [],
  releaseYear: null,
  ratingFrom: "",
  ratingTo: "",
  loader: false,
  error: false,
  isModal: false,
  dataMovie: {
    id: 0,
    original_title: "",
    poster_path: "",
    release_date: "",
    vote_average: 0,
    vote_count: 0,
    genre_ids: [0],
  },
  movieInform: {
    original_title: "",
    poster_path: "",
    release_date: "",
    vote_average: 0,
    vote_count: 0,
    runtime: 0,
    budget: 0,
    revenue: 0,
    genres: [{id: 0, name: ""}],
    overview: "",
    production_companies: [{
      id: 0,
      logo_path: "",
      name: "",
      origin_country: ""
    }],
    videos: {
      results: [
        {
          name: "",
          key: "",
          site: "",
          id: ""
        }]
    },
    error: false,
  }
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setPage: (state: { page: number }, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSort: (state: { sort: string }, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setGenres: (state: { selectGenres: string[] }, action: PayloadAction<string[]>) => {
      state.selectGenres = action.payload;
    },
    setReleaseYear: (state: { releaseYear: string }, action: PayloadAction<string>) => {
      state.releaseYear = action.payload;
    },
    setRatingFrom: (state: { ratingFrom: number | string }, action: PayloadAction<number>) => {
      state.ratingFrom = action.payload;
    },
    setRatingTo: (state: { ratingTo: number | string }, action: PayloadAction<number>) => {
      state.ratingTo = action.payload;
    },
    setError: (state: { error: boolean }, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    setModal: (state: { isModal: boolean }, action: PayloadAction<boolean>) => {
      state.isModal = action.payload;
    },
    setDataMovie: (state: { dataMovie: Inform }, action: PayloadAction<Inform>) => {
      state.dataMovie = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state: Movies, action) => {
      state.genres = action.payload.genres;
      state.loader = false;
    });
    builder.addCase(getGenres.pending, (state: Movies) => {
      state.loader = true;
    });
    builder.addCase(getMovies.fulfilled, (state: Movies, action) => {
      state.movies = action.payload;
      state.loader = false;
    });
    builder.addCase(getMovies.pending, (state: Movies) => {
      state.loader = true;
    });
    builder.addCase(getMovie.fulfilled, (state: Movies, action) => {
      if (action.payload.error) {
        state.movieInform.error = true;
      }
      if(!action.payload.error){
        state.movieInform = action.payload;
      }
      state.loader = false;
    });
    builder.addCase(getMovie.pending, (state: Movies) => {
      state.loader = true;
    })
  }
});
export const {
  setPage,
  setModal,
  setSort,
  setReleaseYear,
  setGenres,
  setRatingFrom,
  setRatingTo,
  setError,
  setDataMovie,
} = movieSlice.actions;
export default movieSlice.reducer;