import { useState, useEffect } from "react";
import axios from "axios";

const MoviesComponent = () => {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const BACKENDURL = process.env.REACT_APP_BACKEND_API;

    const getMovies = async () => {
        try {
            const response = await axios.get(`${BACKENDURL}/movies`);
            setMovies(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    useEffect(() => {
        getMovies();
    }
    , []);

  return (
      <div>
        <h1 className="text-2xl font-bold text-center">Movies</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {movies.map((movie) => (
              <div key={movie.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
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
}

export default MoviesComponent;