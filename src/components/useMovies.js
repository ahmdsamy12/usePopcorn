import { useEffect, useState } from "react";
import { KEY } from "../App";

export function useMovies(query, callback) {
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);
  const controller = new AbortController();

  async function fetchMovies() {
    callback?.();
    try {
      setIsloading(true);
      setError("");
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${KEY}`,
        { signal: controller.signal }
      );

      console.log(res);

      if (!res.ok) throw new Error("error fetching");

      const data = await res.json();

      console.log(data);

      if (data.total_results === 0) throw new Error("movie not found");

      setMovies(data.results);
      setError("");
    } catch (err) {
      console.error(err.message);

      if (err.name !== "AbortError") {
        setError(err.message);
      }
    } finally {
      setIsloading(false);
    }
  }

  useEffect(() => {
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isloading, error };
}
