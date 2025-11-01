import { useState } from "react";
import Header from "./components/Header";
import AddMovieForm from "./components/AddMovieForm";
import MovieList from "./components/MovieList";
import EmptyState from "./components/EmptyState";

const App = () => {
  const [movies, setMovies] = useState([]);

  const addMovie = (title) => {
    setMovies([...movies, { id: Date.now(), title, rating: 0, comment: "" }]);
  };

  const updateRating = (id, delta) => {
    setMovies((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, rating: Math.max(0, Math.min(5, m.rating + delta)) }
          : m
      )
    );
  };

  const updateComment = (id, comment) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === id ? { ...m, comment } : m))
    );
  };

  const removeMovie = (id) => {
    setMovies((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div
      style={{
        backgroundColor: "#141414",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Header />
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "30px 20px 60px",
        }}
      >
        <AddMovieForm onAdd={addMovie} />
        {movies.length === 0 ? (
          <EmptyState />
        ) : (
          <MovieList
            movies={movies}
            onRate={updateRating}
            onComment={updateComment}
            onRemove={removeMovie}
          />
        )}
      </div>
    </div>
  );
};

export default App;
