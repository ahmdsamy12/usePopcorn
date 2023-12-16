import React from "react";
import Movie from "./Movie";

const MovieList = ({ movies, onSelect }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.id} onSelect={onSelect} />
      ))}
    </ul>
  );
};

export default MovieList;
