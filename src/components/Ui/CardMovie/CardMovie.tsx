import "./CardMovie.css"

interface CardProps {
  movie: MovieOrSerie;
}

export interface MovieOrSerie {
  id: number;
  title?: string;      
  name?: string;       
  poster_path: string;
  vote_average: number;
  
}

export function CardMovieOrSerie({ movie }: CardProps) {
  return (
    <div className="card-container">
      {/* Exemplo de lógica para selos */}
      <span className="badge badge-4k">4K</span>
      
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={movie.title} 
      />

      <div className="card-overlay">
        <div className="card-info">
          <h1>{movie.title || movie.name}</h1>
          <div className="card-meta">
            <span className="rating">
              <i className="star-icon">★</i> {movie.vote_average.toFixed(1)}
            </span>
            <span className="year">2024</span>
          </div>
        </div>
      </div>
    </div>
  );
}