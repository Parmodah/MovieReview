import { createContext, useState } from "react";
import { getMovies } from "../api/movie";
import { useNotification } from "../hooks";

export const MovieContext = createContext();

const limit = 10;
let currentPageNo = 0;

const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [latestUploads, setLatestUploads] = useState([]);
  const [reachToEnd, setReachToEnd] = useState(false);

  const { updateNotification } = useNotification();

  const fetchMovies = async (pageNo = currentPageNo) => {
    const { error, movies } = await getMovies(pageNo, limit);
    if (error) updateNotification("error", error);

    if (!movies.length) {
      currentPageNo = pageNo - 1;
      return setReachToEnd(true);
    }
    setMovies([...movies]);
  };

  const fetchLatestUploads = async (quantity = 5) => {
    const { error, movies } = await getMovies(0, quantity);
    if (error) return updateNotification("error", error);

    setLatestUploads([...movies]);
  };

  const fetchNextPage = () => {
    if (reachToEnd) return;
    currentPageNo += 1;
    fetchMovies(currentPageNo);
  };

  const fetchPrevPage = () => {
    if (currentPageNo <= 0) return;
    if (reachToEnd) setReachToEnd(false);

    currentPageNo -= 1;
    fetchMovies(currentPageNo);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        latestUploads,
        fetchLatestUploads,
        fetchMovies,
        fetchNextPage,
        fetchPrevPage,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MoviesProvider;
