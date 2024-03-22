import { useSelector } from "react-redux";
import useHorrorMovies from "../hooks/useHorrorMovies";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import usePopularMovies from "../hooks/usePopularMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GPTSearch from "./GPTSearch";
import Header from "./Header"
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
const Browse = () => {

  const showGPTSearch = useSelector(store => store.gpt.showGPTSearch);

  useNowPlayingMovies();
  useTrendingMovies();
  usePopularMovies();
  useUpcomingMovies();
  useHorrorMovies();

  return (
    <div>
      <Header />
      {
        showGPTSearch ? <GPTSearch /> :    <>
        <MainContainer />
        <SecondaryContainer />
        </>
      }
      {/* 
         MainContainer
          - VideoBackground
          - VideoTitle
        SecondaryConatiner
         - MovieList * n
          - Cards * n
      */}
    </div>
  )
}

export default Browse;
