import { useState, useEffect } from "react";
import axios from "axios";

const MoviesComponent = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const BACKENDURL = process.env.REACT_APP_BACKEND_API;

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(`${BACKENDURL}/movies`);
        const moviesData = response.data;

        if (moviesData.length) {
          moviesData.pop();
        }

        const theNotebook = {
          Title: "The Notebook",
          Year: "2004",
          Runtime: "123 min",
          Poster: "https://ew.com/thmb/DferII1HexUaxYiMgh19_D1sWQo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/the-notebook_612x380_1-e65e9ca2a0744ca8973fe6daa2fe4af3.jpg",
        };

        const theCityOfGod = {
          Title: "City of God",
          Year: "2002",
          Runtime: "130 min",
          Poster: "https://i.ytimg.com/vi/RfnGQetbX-U/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCeVsxmUzjObKLr0mc8RyC4sSxVKA",
        };

        const RockyIV = {
          Title: "Rocky IV",
          Year: "1985",
          Runtime: "91 min",
          Poster: "https://m.media-amazon.com/images/M/MV5BOTc0NTA3NzUxN15BMl5BanBnXkFtZTgwNzc0MjM2MDI@._V1_.jpg",
        };

        const ThreeHundred = {
          Title: "300",
          Year: "2006",
          Runtime: "117 min",
          Poster: "https://variety.com/wp-content/uploads/2021/04/300.jpg?w=681&h=383&crop=1",
        };

        moviesData.push(theNotebook, theCityOfGod, RockyIV, ThreeHundred);

        setMovies(moviesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    getMovies();
  }, [BACKENDURL]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Movies</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {movies.map((movie, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">{movie.Title}</h2>
              <p className="text-sm text-gray-600">{movie.Year}</p>
              <p className="text-sm text-gray-600">{movie.Runtime}</p>
              <img src={movie.Poster} alt={movie.Title} className="w-full h-48 object-cover mt-2" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesComponent;
