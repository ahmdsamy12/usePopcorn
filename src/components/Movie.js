import React from "react";

const Movie = ({ movie, onSelect }) => {
  return (
    <li key={movie.id} className="" onClick={() => onSelect(movie.id)}>
      <img src={movie.poster_path} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.release_date}</span>
        </p>
      </div>
    </li>
  );
};

export default Movie;
