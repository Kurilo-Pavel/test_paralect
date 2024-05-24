import express from "express";
import fetch from "node-fetch";
import validate from "../validation.mjs";
import {FrontUrl} from "../constant.mjs";

const server = express();
const port = 7780;

const Api = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmI3ZGFjOWE1M2NlM2ZhMGM0MjkyOTY2MGYyN2JiZSIsInN1YiI6IjY2NGIzN2I0NmM1ZTY2ZmU0ZDk2MzdkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l4_lIr82mrcYm0iX6hJBObYj0lNZg67TE_5xLsii5rg';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: Api
  }
};

const typeSorting = (value) => {
  switch (value) {
    case "Most Popular":
      return "popularity.desc";
    case "Least Popular":
      return "popularity.asc";
    case "Most Rated":
      return "vote_average.desc";
    case "Least Rated":
      return "vote_average.asc";
    case "Most Voted":
      return "vote_count.desc";
    case "Least Voted":
      return "vote_count.asc";
  }
};

server.post("/movies/:sortMovie/:page", express.json({type: "*/*"}), (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", `${FrontUrl}`);
  const sortMovie = request.params.sortMovie ? `&sort_by=${typeSorting(request.params.sortMovie)}` : "";
  const page = request.params.page;
  const year = request.body.releaseYear ? `&primary_release_year=${request.body.releaseYear}` : "";
  const genres = request.body.genres?.length > 0 ? `&with_genres=${request.body.genres.join("%2C")}` : "";
  const ratingFrom = request.body.ratingFrom && !validate(request.body.ratingFrom, request.body.ratingTo, true) ? `&vote_average.gte=${request.body.ratingFrom}` : "";
  const ratingTo = request.body.ratingTo && !validate(request.body.ratingTo, request.body.ratingFrom, false) ? `&vote_average.lte=${request.body.ratingTo}` : "";
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}${sortMovie}${ratingFrom}${ratingTo}${genres}${year}`;
  (!validate(request.body.ratingFrom, request.body.ratingTo, true) && !validate(request.body.ratingTo, request.body.ratingFrom, false)) ?
    fetch(url, options)
      .then(res => res.json())
      .then(res => response.send(res)) :
    response.send({page: 0, total_pages: 0, results: []});
});

server.get("/genres", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", `${FrontUrl}`);

  const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';

  fetch(url, options)
    .then(res => res.json())
    .then(json => response.send(json))
    .catch(err => console.error('error:' + err));
});

server.get("/getInformMovie/:id", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", `${FrontUrl}`);

  const id = request.params.id;
  const url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos&language=en-US'`
  fetch(url, options)
    .then(res => {
      if (res.status !== 200) {
        response.status(404).send({error: "not found"});
      } else {
      return res.json();
      }
    })
    .then(json =>response.send(json))
    .catch(err => console.error('error:' + err));
});

server.listen(port, () => {
  console.log("server working...");
});