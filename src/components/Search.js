import { useEffect, useRef } from "react";
import { useKey } from "./useKey";

const Search = ({ query, updateQuery }) => {
  const inputEl = useRef(null);

  function callback() {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    updateQuery("");
  }

  useKey("Enter", callback);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => updateQuery(e.target.value)}
      ref={inputEl}
    />
  );
};

export default Search;
