import { useEffect } from "react";
// import { useState } from "react";
// import { DeleteMovie, getMovieForUpdate, getMovies } from "../../api/movie";
import { useMovies, useNotification } from "../../hooks";
// import ConfirmModal from "../modals/ConfirmModal";
// import UpdateMovie from "../modals/UpdateMovie";
import MovieListItem from "../MovieListItem";
import NextAndPrevButton from "../NextAndPrevButton";

// const limit = 10;
// let currentPageNo = 0;

const Movies = () => {
  // const [movies, setMovies] = useState([]);
  // const [showUpdateModal, setShowUpdateModal] = useState(false);
  // const [showConfirmModal, setShowConfirmModal] = useState(false);
  // const [busy, setBusy] = useState(false);
  // const [selectedMovie, setSelectedMovie] = useState(null);

  // const { updateNotification } = useNotification();

  const {
    fetchMovies,
    fetchPrevPage,
    fetchNextPage,
    movies: newMovies,
  } = useMovies();

  // const fetchMovies = async (pageNo) => {
  //   const { error, movies } = await getMovies(pageNo, limit);
  //   if (error) updateNotification("error", error);

  //   if (!movies.length) {
  //     currentPageNo = pageNo - 1;
  //     return setReachToEnd(true);
  //   }
  //   setMovies([...movies]);
  // };

  // const handleOnNextClick = () => {
  //   if (reachToEnd) return;
  //   currentPageNo += 1;
  //   fetchMovies(currentPageNo);
  // };

  // const handleOnPrevClick = () => {
  //   if (currentPageNo <= 0) return;
  //   if (reachToEnd) setReachToEnd(false);

  //   currentPageNo -= 1;
  //   fetchMovies(currentPageNo);
  // };

  // const handleOnEditClick = async ({ id }) => {
  //   const { movie, error } = await getMovieForUpdate(id);
  //   if (error) return updateNotification("error", error);
  //   setSelectedMovie(movie);
  //   setShowUpdateModal(true);
  // };

  // const handleOnDeleteClick = (movie) => {
  //   setSelectedMovie(movie);
  //   setShowConfirmModal(true);
  // };

  // const handleOnDeleteConfirm = async () => {
  //   setBusy(true);
  //   const { error, message } = await DeleteMovie(selectedMovie.id);
  //   setBusy(false);

  //   if (error) return updateNotification("error", error);

  //   updateNotification("success", message);
  //   hideConfirmModal();
  //   fetchMovies(currentPageNo);
  // };

  // const handleOnUpdate = (movie) => {
  //   const updatedMovies = movies.map((m) => {
  //     if (m.id === movie.id) return movie;
  //     return m;
  //   });

  //   setMovies([...updatedMovies]);
  // };

  // const hideUpdateForm = () => setShowUpdateModal(false);
  // const hideConfirmModal = () => setShowConfirmModal(false);

  const handleUiUpdate = () => fetchMovies();

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <div className="space-y-3 p-5">
        {newMovies.map((movie) => {
          return (
            <MovieListItem
              key={movie.id}
              movie={movie}
              afterDelete={handleUiUpdate}
              afterUpdate={handleUiUpdate}
              // onEditClick={() => handleOnEditClick(movie)}
              // onDeleteClick={() => handleOnDeleteClick(movie)}
            />
          );
        })}
        <NextAndPrevButton
          className="mt-5"
          onNextClick={fetchNextPage}
          onPrevClick={fetchPrevPage}
        />
      </div>

      {/* <ConfirmModal
        visible={showConfirmModal}
        onConfirm={handleOnDeleteConfirm}
        onCancel={hideConfirmModal}
        title="Are you sure?"
        subTitle="This action will remove the movie permanently!"
        busy={busy}
      />
      <UpdateMovie
        visible={showUpdateModal}
        initialState={selectedMovie}
        onSuccess={handleOnUpdate}
        onClose={hideUpdateForm}
      /> */}
    </>
  );
};

export default Movies;
