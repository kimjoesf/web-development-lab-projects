import MovieCard from "./MovieCard";

const MovieList = ({ movies, onRate, onComment, onRemove }) => {
    return (
        <div>
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onRate={onRate} onComment={onComment} onRemove={onRemove}
                />
            ))}
        </div>
    );
};

export default MovieList;
