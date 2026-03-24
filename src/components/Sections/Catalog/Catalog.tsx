import { useState, useEffect } from "react";
import "./Catalog.css";
import { CardMovieOrSerie } from "../../Ui/CardMovie/CardMovie";
import { fetchMovies, type Movie } from "../../../services/api";
import { FilterBar } from "../../Ui/FilterBar/FilterBar";


interface CatalogProps {
  type: string;
  searchQuery: string;
  onOpenModal: (id: number) => void;
}

export function Catalog({ type, searchQuery, onOpenModal }: CatalogProps) {
  const [items, setItems] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(0); 

  
  useEffect(() => {
    setSelectedGenre(0);
  }, [type]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const isSearch = searchQuery.trim().length > 0;
        const isFiltering = selectedGenre !== 0;

        let endpoint = `/${type}/popular`; 
        const params: Record<string, string | number> = {};

        
        if (isSearch) {
          endpoint = `/search/${type}`;
          params.query = searchQuery;
        } else if (isFiltering) {
          
          endpoint = `/discover/${type}`;
          params.with_genres = selectedGenre;
          params.sort_by = "popularity.desc"; 
        }

        const data = await fetchMovies(endpoint, params);
        setItems(data);
      } catch (err) {
        console.error("Erro na API:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTime = searchQuery.trim().length > 0 ? 500 : 0;
    const debounceTimer = setTimeout(loadData, debounceTime);
    return () => clearTimeout(debounceTimer);
  }, [type, searchQuery, selectedGenre]); 

  return (
    <main className="catalog-container">
      
      {!searchQuery.trim() && (
        <FilterBar 
          selectedGenre={selectedGenre} 
          setSelectedGenre={setSelectedGenre} 
        />
      )}

      <header className="catalog-header">
        <h1>
          {searchQuery.trim() 
            ? `Resultados para "${searchQuery}"` 
            : type === "movie" ? "Filmes Populares" : "Séries Populares"}
        </h1>
      </header>

      {loading ? (
        <div className="loading-state">
           <div className="loader"></div>
           <span>Buscando conteúdo...</span>
        </div>
      ) : items.length > 0 ? (
        <section className="movie-grid">
          {items.map((item) => (
            <div key={item.id} onClick={() => onOpenModal(item.id)} className="card-wrapper">
              <CardMovieOrSerie movie={item} />
            </div>
          ))}
        </section>
      ) : (
        <div className="no-results">
          <p>Nenhum resultado encontrado para este filtro.</p>
        </div>
      )}
    </main>
  );
}