import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsTrash, BsPencilSquare } from "react-icons/bs";

import { deleteReview, getReviewByMovie } from "../../api/review";
import { useAuth, useNotification } from "../../hooks";
import Container from "../Container";
import CustomButtonLink from "../CustomButtonLink";
import RatingStar from "../RatingStar";
import ConfirmModal from "../modals/ConfirmModal";
import NotFoundText from "../NotFoundText";
import EditRatingModal from "../modals/EditRatingModal";

const getNameInitial = (name = "") => {
  return name[0].toUpperCase();
};

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [profileOwnerReview, setProfileOwnerReview] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [busy, setBusy] = useState(false);
  const { movieId } = useParams();

  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const profileId = authInfo.profile?.id;

  const fetchReviews = async () => {
    const { movie, error } = await getReviewByMovie(movieId);
    if (error) updateNotification("error", error);

    setReviews([...movie.reviews]);
    setMovieTitle(movie.title);
  };

  const findProfileOwnersReview = () => {
    if (profileOwnerReview) return setProfileOwnerReview(null);

    const matched = reviews.find((review) => review.owner.id === profileId);
    if (!matched)
      return updateNotification("error", "You don't have any review!");

    setProfileOwnerReview(matched);
  };

  const handleOnEditClick = () => {
    const { id, rating, content } = profileOwnerReview;
    setSelectedReview({
      id,
      content,
      rating,
    });

    setShowEditModal(true);
  };

  const handleDeleteConfirm = async () => {
    setBusy(true);
    const { error, message } = await deleteReview(profileOwnerReview.id);
    setBusy(false);
    if (error) updateNotification("error", error);

    updateNotification("success", message);

    const updatedReviews = reviews.filter(
      (r) => r.id !== profileOwnerReview.id
    );
    setReviews([...updatedReviews]);
    setProfileOwnerReview(null);
    hideConfirmModal();
  };

  const handleOnReviewUpdate = (review) => {
    const updatedReview = {
      ...profileOwnerReview,
      rating: review.rating,
      content: review.content,
    };
    setProfileOwnerReview({ ...updatedReview });

    const newReviews = reviews.map((r) => {
      if (r.id === updatedReview.id) return updatedReview;
      return r;
    });
    setReviews([...newReviews]);
  };

  const displayConfirmModal = () => setShowConfirmModal(true);
  const hideConfirmModal = () => setShowConfirmModal(false);

  const hideEditModal = () => {
    setShowEditModal(false);
    setSelectedReview(null);
  };

  useEffect(() => {
    if (movieId) fetchReviews();
  }, [movieId]);

  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container className="xl:px-0 px-2 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-secondary dark:text-white">
            <span className="text-light-subtle dark:text-dark-subtle font-normal">
              Reviews for:
            </span>{" "}
            {movieTitle}
          </h1>

          {profileId ? (
            <CustomButtonLink
              label={profileOwnerReview ? "View All" : "Find My Review"}
              onClick={findProfileOwnersReview}
            />
          ) : (
            "null"
          )}
        </div>

        <NotFoundText text="No Reviews!" visible={!reviews.length} />

        {profileOwnerReview ? (
          <div>
            <ReviewCard review={profileOwnerReview} />
            <div className="flex space-x-3 dark:text-white text-primary text-xl p-3">
              <button onClick={displayConfirmModal} type="button">
                <BsTrash />
              </button>
              <button onClick={handleOnEditClick} type="button">
                <BsPencilSquare />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 mt-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </Container>

      <ConfirmModal
        visible={showConfirmModal}
        onCancel={hideConfirmModal}
        onConfirm={handleDeleteConfirm}
        busy={busy}
        title="Are you sure"
        subtitle="This action will remove permanently"
      />

      <EditRatingModal
        visible={showEditModal}
        initialState={selectedReview}
        onSuccess={handleOnReviewUpdate}
        onClose={hideEditModal}
      />
    </div>
  );
};

const ReviewCard = ({ review }) => {
  if (!review) return null;

  const { owner, content, rating } = review;
  return (
    <div className="flex space-x-3">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-light-subtle dark:bg-dark-subtle text-white text-xl select-none">
        {getNameInitial(owner.name)}
      </div>
      <div>
        <h1 className="dark:text-white text-secondary font-semibold text-lg">
          {owner.name}
        </h1>
        <RatingStar rating={rating} />
        <p className="text-light-subtle dark:text-dark-subtle">{content}</p>
      </div>
    </div>
  );
};

export default MovieReviews;
