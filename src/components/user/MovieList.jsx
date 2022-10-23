import GridContainer from "../GridContainer";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import RatingStar from "../RatingStar";
import { getPoster } from "../../utils/helper";

const MovieList = ({ title, movies }) => {
  if (!movies.length) return null;

  return (
    <div>
      {title ? (
        <h1 className="text-2xl  dark:text-white text-secondary font-semibold mb-5">
          {title}
        </h1>
      ) : null}
      <GridContainer>
        {movies.map((movie) => {
          return <ListItem key={movie.id} movie={movie} />;
        })}
      </GridContainer>
    </div>
  );
};

const ListItem = ({ movie }) => {
  const trimTitle = (text = "") => {
    if (text.length <= 20) return text;
    return text.substring(0, 20) + "..";
  };

  const { id, responsivePosters, title, poster, reviews } = movie;

  return (
    <Link to={"/movie/" + id}>
      <img
        className="aspect-video object-cover w-full"
        // this is for small images to reduce screenload time
        src={getPoster(responsivePosters) || poster}
        // src={poster} // full rezolution poster
        alt={title}
      />
      <h1
        className="text-lg  dark:text-white text-secondary font-semibold"
        title={title}
      >
        {trimTitle(title)}
      </h1>
      <RatingStar rating={reviews.ratingAvg} />
    </Link>
  );
};

export default MovieList;
