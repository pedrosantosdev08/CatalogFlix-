import { useState } from "react";
import { Header } from "./components/Sections/Header/Header";
import { Catalog } from "./components/Sections/Catalog/Catalog";
import { ModalMovie } from "./components/Ui/Modal/Modal";


export function App() {
  const [view, setView] = useState("movie");
  const [searchQuery, setSearchQuery] = useState("");
  

  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  return (
    <div className="app-wrapper">
      <Header 
        currentView={view} 
        setView={setView} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      
      <Catalog 
        type={view} 
        searchQuery={searchQuery} 
        
        onOpenModal={(id) => setSelectedMovieId(id)} 
      />

      {/* RENDERIZAÇÃO CONDICIONAL DO MODAL */}
      {selectedMovieId && (
        <ModalMovie 
          id={selectedMovieId} 
          type={view} 
          onClose={() => setSelectedMovieId(null)} 
        />
      )}
    </div>
  );
}