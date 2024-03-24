import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import Openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGPTMovieResult } from "../utils/gptSlice";
const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  // search movie in TMDB 
  const searchMovieTMDB = async (movie) => {
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+
    movie +
    '&include_adult=false&language=en-US&page=1', API_OPTIONS);

    const json = await data.json();

    return json.results;
  }

  const handleGPTSearchClick = async() => {
    console.log(searchText.current.value);
    // MAke an API Call to GPT API and get movie Results

    const GPTQuery = "Act as a Movie Recommendation system and suggest some movies for the query: " + searchText.current.value + ". Only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Don, Sholay, Dhamal, Golmaal, Koi Mil Gaya";

    const GPTResults = await Openai.chat.completions.create({
      messages: [{ role: 'user', content: GPTQuery }],
      model: 'gpt-3.5-turbo',
    });

    if(!GPTResults.choices){
      // TODO: Write Error Handling
    }

    console.log(GPTResults.choices?.[0]?.message?.content);
    const GPTMovies = GPTResults.choices?.[0]?.message?.content.split(",");

    // [Andaz Apna Apna, Chupke Chupke, Padosan, Chhoti Si Baat, Chalti Ka Naam Gaadi]

    // For Each movie I will search TMDB API

    const promiseArray = GPTMovies.map(movie => searchMovieTMDB(movie));

    // [Promise, Promise, Promise, Promise, Promise]

    const TMDBResults = await Promise.all(promiseArray);
    console.log(TMDBResults);

    dispatch(addGPTMovieResult({
      movieNames: GPTMovies,
      movieResults: TMDBResults,
    }))

  };
  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form className="w-full md:w-1/2 bg-black grid grid-cols-12" onSubmit={(e) => e.preventDefault()}>
        <input
        ref = {searchText}
        type="text" className="p-4 m-4 col-span-9" placeholder= {lang[langKey].GPTSearchPlaceholder}
        />
        <button className=" col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg" onClick={handleGPTSearchClick}>
          {lang[langKey].search}
        </button>
      </form>
    </div>
  )
}

export default GPTSearchBar;
