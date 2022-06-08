import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { fetchMovieDetails } from "src/slices/movies";

// Images
import backIcon from "src/assets/images/icons/icon-arrow-grey.svg";

const MovieDetails = () => {
  const dispatch = useDispatch();
  let { id } = useParams();

  // State
  const { movieDetails, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);
  return (
    <div>
      <div className="mt-8">
        <Link to="/" className="cursor-pointer">
          <img src={backIcon} alt="" />
        </Link>
      </div>
      {movieDetails && (
        <div className="flex flex-col-reverse justify-between gap-10 mt-8 lg:flex-row">
          <div className="lg:w-[50%]">
            <div className="text-5xl text-white">{movieDetails.Title}</div>

            <div className="mt-6 text-2xl text-gray-500">Plot</div>
            <div className="mt-5 text-2xl text-white">{movieDetails.Plot}</div>
            <div className="flex justify-between mt-12">
              <div>
                <div className="text-2xl text-gray-500">Cast</div>
                {/* <div className="mt-3 text-2xl text-white">Genre</div> */}
              </div>
              <div>
                <div className="text-2xl text-gray-500">Genre</div>
                <div className="mt-3 text-2xl text-white">{movieDetails.Genre}</div>
              </div>
              <div>
                <div className="text-2xl text-gray-500">Director</div>
                <div className="mt-3 text-2xl text-white">{movieDetails.Director}</div>
              </div>
            </div>
          </div>
          <div className="lg:w-[50%] flex lg:justify-center lg:px-10">
            <img className="lg:w-full w-[350px] lg:h-[500px] object-cover rounded-[5px]" src={movieDetails.Poster} alt="" />
          </div>
        </div>
      )}
      {movieDetails == null && !error && (
        <div className="text-white flex justify-center items-center text-3xl h-[50vh]">...Loading</div>
      )}
      {movieDetails == null && error && (
        <div className="text-white flex justify-center items-center text-3xl h-[50vh]">{error}</div>
      )}
    </div>
  );
};

export default MovieDetails;
