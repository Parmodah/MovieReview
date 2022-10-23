import Container from "../Container";
import HeroSlideShow from "../user/HeroSlideShow";
import NotVerified from "../user/NotVerified";
import TopRatedMovies from "../user/TopRatedMovies";
import TopRatedWebSeries from "../user/TopRatedWebSeries";

const Home = () => {
  return (
    <div className="dark:bg-primary bg-white min-h-screen">
      <Container className="px-2 xl:p-0">
        <NotVerified />
        {/* Slider  */}
        <HeroSlideShow />
        {/* Most rated movies */}
        <div className="space-y-3 py-8"></div>
        <TopRatedMovies />
        <TopRatedWebSeries />
      </Container>
    </div>
  );
};

export default Home;
