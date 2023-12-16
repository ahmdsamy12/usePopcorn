import React, { useEffect, useState } from "react";
import { KEY } from "../App";
import StarRatting from "./StarRatting";
import Loader from "./Loader";
import { useKey } from "./useKey";

const MovieDetails = ({ selectedId, onClick, onAddWatched, watched }) => {
  const [movie, setMovie] = useState({});
  const [isloading, setIsloading] = useState(false);

  const isWatched = watched
    .map((movie) => {
      return movie.id;
    })
    .includes(selectedId);

  console.log(isWatched);

  const {
    id: id,
    original_title: title,
    release_date: year,
    poster_path: poster,
    runtime: runtime,
  } = movie;

  async function getMovieDetails() {
    try {
      setIsloading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${selectedId}?api_key=${KEY}`
      );
      const data = await res.json();
      setMovie(data);
      setIsloading(false);
    } catch (err) {}
  }

  useEffect(() => {
    getMovieDetails();
  }, [selectedId]);

  function handleAdd() {
    const newMovie = {
      id,
      title,
      year,
      poster,
      runtime: +runtime,
    };

    onAddWatched(newMovie);
    onClick();
  }

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = "usePopcorn";
    };
  }, [title]);

  useKey("Escape", onClick);

  return (
    <>
      {isloading ? (
        <Loader />
      ) : (
        <>
          <div className="detail">
            <header>
              <button onClick={onClick} className="btn-back">
                &larr;
              </button>
              <img src={poster} alt={title} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {year} {runtime}
                </p>
              </div>
            </header>
          </div>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRatting maxRating={10} size={24} />
                  <button className="btn-add" onClick={handleAdd}>
                    + add to list
                  </button>
                </>
              ) : (
                <p>this movie is rated</p>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default MovieDetails;
