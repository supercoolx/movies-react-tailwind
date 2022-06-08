import HeartWhite from "src/assets/images/icons/icon-heart-white.svg";

const MovieCard = ({ movie, handleClick, hoverMovie, handleMouseOver }) => {
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => handleClick(movie.imdbID)}
      onMouseOver={() => handleMouseOver(movie.imdbID)}
    >
      <div className="absolute top-[10px] right-[10px] z-10">
        <img className="w-[30px] h-[30px]" src={HeartWhite} alt="" />
      </div>
      <img className="rounded-[5px] object-cover w-[200px] h-[300px] hover:brightness-50" src={movie.Poster} alt="" />
      {hoverMovie === movie.imdbID && (
        <div className="absolute w-full bottom-[20px]">
          <div className="p-6 text-lg text-white">{movie.Title}</div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
