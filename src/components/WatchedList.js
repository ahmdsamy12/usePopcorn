import React from "react";
import WatchedMovieList from "./WatchedMovieList";

const WatchedList = ({ watched, onDelete }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieList movie={movie} key={movie.id} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default WatchedList;
