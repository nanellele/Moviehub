import './App.css'
import { useState, useEffect } from "react"
import SearchIcon from './search.svg'
import MovieCard from './MovieCard'

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=4178d013"

function Movies(props) {
  return (
    <div className="Movie">
      {props.title} <br></br> {props.rating}  <br></br> <img src={props.image} width="200px" />
    </div>
  )
}

const movie1 = {
  "Title": "Ponyo",
  "Year": "2008",
  "imdbID": "tt0110357",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BOTc3YmM3N2QtODZkMC00ZDE5LThjMTQtYTljN2Y1YTYwYWJkXkEyXkFqcGdeQXVyODEzNjM5OTQ@._V1_FMjpg_UX1000_.jpg"
}

const movie2 = {
  "Title": "Song of the Sea",
  "Year": "2014",
  "imdbID": "tt1865505",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BMTQ2MDMwNjEwNV5BMl5BanBnXkFtZTgwOTkxMzI0MzE@._V1_.jpg"
}

const movie3 = {
  "Title": "Spirited Away",
  "Year": "2001",
  "imdbID": "tt0401543",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
}

const movie4 = {
  "Title": "Spider-Man: No Way Home",
  "Year": "2021",
  "imdbID": "tt10872600",
  "Type": "movie",
  "Poster": "https://i.ebayimg.com/images/g/Z8EAAOSwYSpi3vjf/s-l1600.jpg"
}

const Search = () => {
  const [movies, setMovies] = useState([movie1, movie2, movie3, movie4]);
  const [input, setInput] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0.0);
  
  
  const HandleNameChange = (event) => {
    const simklMovieURL = `https://api.simkl.com/search/movie?q=${event.target.value}&client_id=b48ec175978492c7cfa16374d27cf72298a00a1b5250141cf2445c02a180ac47`;
    setInput(event.target.value)
    setTitle(event.target.value)
    fetch(simklMovieURL)
      .then(response => response.json())
      .then(data => {
        console.log("hello api2")
        console.log(data)
        // setImage(poster)
        // setRating(data[0].ratings.imdb.rating)

        let tempMovies = [];
        
        for(let i in data){

          const poster = `https://wsrv.nl/?url=https://simkl.in/posters/${data[i].poster}_m.jpg`
          const tempMovie = {
            "Title": data[i].title,
            "Year": data[i].year,
            "simklID": data[i].ids.simkl_id,
            "Type": "Movie",
            "Poster": poster
          }

          tempMovies.push(tempMovie)
        }

        tempMovies.sort(function(a, b){
          return b.Year - a.Year
        });
        
        setMovies(tempMovies);
        // setMovie(tempMovie)
      })
      .catch(error => {
        console.log(error);
        setImage("");
        setRating(0.0);
      });

  }

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input className="search" type="text" placeholder="Search for movies.." value={input} onChange={HandleNameChange} />
      </label>
      <img className="searchIcon" src={SearchIcon} width="20px" alt="search" onClick={() => searchMovies(searchTerm)} />
      {
        movies.length > 0
        ? (
          <div className="container">
            {movies.map((movie) => (<MovieCard movie={movie} />))}
          </div>
        ) :
        (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )
      }
      {/* <Movies title={title} rating={rating} image={image} /> */}
    </form>
  );
};

export default function App() {
  return (
    <div className="app">
      <h1 data-text="Moviehub">Moviehub</h1> <img className="stars" src="https://i.gifer.com/XZ5V.gif"></img>
      <Search />
    </div>
  )
}
