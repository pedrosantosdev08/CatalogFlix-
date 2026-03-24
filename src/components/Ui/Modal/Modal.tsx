import { useEffect, useState } from "react";
import { fetchFromTMDB, type Movie } from "../../../services/api";
import "./Modal.css";

interface ModalProps {
  id: number;
  type: string;
  onClose: () => void;
}

export function ModalMovie({ id, type, onClose }: ModalProps) {
  const [data, setData] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchFromTMDB<Movie>(`/${type}/${id}`, { 
          append_to_response: "watch/providers,videos" 
        });
        setData(response);
      } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
      } finally {
        setLoading(false);
      }
    };
    getDetails();
  }, [id, type]);

  if (loading) return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-loader-container">
        <div className="loader"></div>
        <span>Carregando...</span>
      </div>
    </div>
  );

  if (!data) return null;

  const trailer = data.videos?.results.find(v => v.type === "Trailer" && v.site === "YouTube");
  const providers = data["watch/providers"]?.results?.BR?.flatrate;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Fechar">&times;</button>
        
        
        <div className="modal-hero">
          {trailer ? (
            <div className="video-wrapper">
              <iframe 
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1`} 
                title="Trailer"
                allow="autoplay; encrypted-media"
                allowFullScreen 
              />
            </div>
          ) : (
            <div className="poster-fallback">
              <img src={`https://image.tmdb.org/t/p/w1280${data.poster_path}`} alt={data.title} />
              <div className="overlay-gradient"></div>
            </div>
          )}
        </div>

        <div className="modal-detail-container">
          <div className="modal-main-info">
            <div className="header-titles">
              <h2>{data.title || data.name}</h2>
              <div className="meta-badge-group">
                <span className="match-score">{(data.vote_average * 10).toFixed(0)}% relevante</span>
                <span className="year-badge">
                  {(data.release_date || data.first_air_date)?.split("-")[0]}
                </span>
                <span className="runtime-badge">
                  {data.runtime ? `${data.runtime}m` : `${data.episode_run_time?.[0] || '--'}m`}
                </span>
                <span className="hd-badge">HD</span>
              </div>
            </div>

            <p className="modal-overview">{data.overview || "Sinopse não disponível."}</p>
          </div>

          <div className="modal-side-info">
             <div className="info-item">
                <span>Gêneros:</span>
                <p>{data.genres?.map(g => g.name).join(", ")}</p>
             </div>

            {providers && providers.length > 0 && (
              <div className="providers-section">
                <span>Disponível em:</span>
                <div className="providers-grid">
                  {providers.map((p) => (
                    <img 
                      key={p.provider_id} 
                      src={`https://image.tmdb.org/t/p/w92${p.logo_path}`} 
                      title={p.provider_name} 
                      alt={p.provider_name}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}