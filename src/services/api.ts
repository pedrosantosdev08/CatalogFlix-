export interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  overview?: string;
  runtime?: number;
  episode_run_time?: number[];
  genres?: { id: number; name: string }[];
  "watch/providers"?: {
    results?: {
      BR?: {
        flatrate?: {
          provider_id: number;
          provider_name: string;
          logo_path: string;
        }[];
      };
    };
  };
  videos?: {
    results: { key: string; site: string; type: string }[];
  };
}

interface TMDBResponse<T> {
  results: T[];
}

const API_TOKEN = import.meta.env.VITE_API_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchFromTMDB = async <T>(
  endpoint: string,
  params: Record<string, string | number> = {},
): Promise<T> => {
  const urlParams = new URLSearchParams({
    language: "pt-BR",
    ...Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, String(value)]),
    ),
  });

  const url = `${BASE_URL}${endpoint}?${urlParams}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Erro detalhado da TMDB:", errorData);
    throw new Error(`Erro HTTP: ${response.status}`);
  }

  return (await response.json()) as T;
};

export const fetchMovies = async (endpoint: string, params?: Record<string, string | number>): Promise<Movie[]> => {
  const data = await fetchFromTMDB<TMDBResponse<Movie>>(endpoint, params);
  return data.results || [];
};