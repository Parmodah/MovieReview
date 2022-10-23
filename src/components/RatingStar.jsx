import { AiFillStar } from "react-icons/ai";

const RatingStar = ({ rating }) => {
  if (!rating)
    return (
      <p className="text-highlight dark:text-highlight-dark ">No reviews</p>
    );

  return (
    <p className="text-highlight dark:text-highlight-dark flex items-center space-x-1">
      <span>{rating}</span>
      <AiFillStar />
    </p>
  );
};

export default RatingStar;
