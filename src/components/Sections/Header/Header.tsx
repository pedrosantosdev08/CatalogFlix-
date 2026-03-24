import {
  faBell,
  faMagnifyingGlass,
  faUser,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, type Dispatch, type SetStateAction } from "react";
import "./Header.css";

interface HeaderProps {
  currentView: string;
  setView: Dispatch<SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

export function Header({
  currentView,
  setView,
  searchQuery,
  setSearchQuery,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleNavClick = (type: string) => {
    setView(type);
    setSearchQuery("");
    setIsMenuOpen(false);
  };

  return (
    <header className="header-container">
      <div className="header-content">
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
        </button>

        <div className="header-title">
          <h1>CatalogFlix</h1>
        </div>

        <nav className={`nav-wrapper ${isMenuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            {["movie", "tv"].map((type) => (
              <li key={type}>
                <button
                  className={currentView === type ? "active" : ""}
                  onClick={() => handleNavClick(type)}
                >
                  {type === "movie" ? "Filmes" : "Séries"}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <button 
            className="mobile-search-toggle" 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>

          <div className={`search-container ${isSearchOpen ? "mobile-open" : ""}`}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar títulos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="btn-actions desktop-only">
            <FontAwesomeIcon icon={faBell} size="lg" />
          </button>
          
          <button className="btn-actions profile-btn">
            <FontAwesomeIcon icon={faUser} size="lg" />
          </button>
        </div>
      </div>
    </header>
  );
}