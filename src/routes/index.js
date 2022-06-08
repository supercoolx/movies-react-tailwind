import HomePage from "src/pages/Home/HomePage";
import MovieDetails from "src/pages/Movie/MovieDetails";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "details/:id", element: <MovieDetails /> },
];
export default routes;
