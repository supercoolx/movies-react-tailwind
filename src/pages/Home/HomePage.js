import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchMovies } from "src/slices/movies";

import searchIcon from "src/assets/images/icons/icon-magnifier-grey.svg";
import emptyStateImage from "src/assets/images/illustrations/illustration-empty-state.png";
import MovieCard from "src/components/MovieCard";

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const HomePage = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [hoverMovie, setHoverMovie] = useState(0);
  const debounceResult = useRef();

  // Navigate
  const navigate = useNavigate();
  // State
  const { movies, error, loading } = useSelector((state) => state.movies);

  const handleClick = (id) => {
    navigate(`details/${id}`);
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
    debounceResult.current(e);
  };
  const handleMouseOver = (id) => {
    setHoverMovie(id);
  };

  useEffect(() => {
    debounceResult.current = debounce((e) => {
      dispatch(fetchMovies(e.target.value));
    }, 2000);
  }, [dispatch]);
  return (
    <section className="mt-6">
      <div className="">
        <div className="bg-white border rounded-[4px] flex items-center">
          <div className="px-2">
            <img src={searchIcon} alt="Search Icon" />
          </div>
          <input
            type="text"
            className="w-full py-2 outline-none"
            placeholder="Search Movies..."
            value={searchText}
            onChange={handleChange}
          />
        </div>
        {!searchText && (
          <div className="h-[80vh] flex flex-col justify-center items-center">
            <div>
              <img src={emptyStateImage} alt="" />
            </div>
            <div className="text-lg text-white">Don't know what to search?</div>
            <div className="mt-3 text-gray-400">
              Here's an offer you can't refuse
            </div>
          </div>
        )}
        {searchText && movies.length > 0 && (
          <div className="flex flex-wrap justify-around gap-10 mt-10">
            {movies.map((movie) => (
              <MovieCard
                movie={movie}
                handleClick={handleClick}
                key={movie.imdbID}
                hoverMovie={hoverMovie}
                handleMouseOver={handleMouseOver}
              />
            ))}
          </div>
        )}
        {error && movies.length === 0 && (
          <div className="text-white flex justify-center items-center text-3xl h-[50vh]">{error}</div>
        )}
        {loading && <div className="text-white flex justify-center items-center text-3xl h-[50vh]">Loading...</div>}
      </div>
    </section>
  );
};

export default HomePage;
