import "./FilterBar.css";


const GENRES = [
  { id: 0, name: "Todos" },
  { id: 28, name: "Ação" },
  { id: 878, name: "Ficção Científica" },
  { id: 53, name: "Suspense" },
  { id: 12, name: "Aventura" },
  { id: 14, name: "Fantasia" },
  { id: 27, name: "Terror" },
  { id: 35, name: "Comédia" },
];

interface FilterBarProps {
  selectedGenre: number;
  setSelectedGenre: (id: number) => void;
}

export function FilterBar({ selectedGenre, setSelectedGenre }: FilterBarProps) {
  return (
    <section className="filter-container">
      <p className="filter-subtitle">Descubra os títulos mais assistidos da semana</p>
      
      <div className="filter-wrapper">
        {GENRES.map((genre) => (
          <button
            key={genre.id}
            className={`filter-chip ${selectedGenre === genre.id ? "active" : ""}`}
            onClick={() => setSelectedGenre(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </section>
  );
}