import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GameCard from './GameCard';
import { Game } from '../types/game';
import '../styles/HomePage.css';
import { processGameData } from '../utils/gameProcessor';

const categorySections = [
  { id: 'featured', title: 'Featured Games', description: 'Handpicked games for an amazing experience', viewAllLink: '/featured' },
  { id: 'popular', title: 'Most Popular', description: 'Games everyone is playing right now', viewAllLink: '/popular' },
  { id: 'new', title: 'New Releases', description: 'Fresh and exciting games just added', viewAllLink: '/new-releases' },
  { id: 'action', title: 'Action Games', description: 'Fast-paced excitement and thrills', viewAllLink: '/category/action' },
  { id: 'puzzle', title: 'Puzzle Games', description: 'Challenge your mind with brain teasers', viewAllLink: '/category/puzzle' },
];

const HomePage: React.FC = () => {
  const [games, setGames] = useState<Record<string, Game[]>>({
    featured: [],
    popular: [],
    new: [],
    action: [],
    puzzle: [],
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchGames = async () => {
      try {
        // For now, use the CSV data and process it
        // This would be replaced with actual API calls
        const response = await fetch('/data/games.json');
        const allGames = await response.json();
        
        // Process games from the CSV file
        const processedGames = processGameData(allGames);
        
        setGames({
          featured: processedGames.filter(game => game.featured).slice(0, 5),
          popular: processedGames.filter(game => game.popular).slice(0, 8),
          new: processedGames.filter(game => game.isNew).slice(0, 8),
          action: processedGames.filter(game => game.category === 'Action').slice(0, 8),
          puzzle: processedGames.filter(game => game.category === 'Puzzle').slice(0, 8),
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching games:', error);
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleStartPlaying = () => {
    // 导航到热门游戏页面或第一个游戏
    if (games.popular.length > 0) {
      navigate(`/game/${games.popular[0].slug}`);
    } else {
      navigate('/popular');
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Play Instantly. <span className="highlight">No Downloads.</span>
            </h1>
            <p className="hero-subtitle">
              Experience the best online games collection at TapGameNest. Jump right into action with no installations required!
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary hero-btn" onClick={handleStartPlaying}>
                Start Playing
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <Link to="/categories" className="btn btn-outline">Browse Categories</Link>
            </div>
          </div>
          
          <div className="hero-games">
            {isLoading ? (
              <div className="loading-skeleton">
                <div className="skeleton-card"></div>
                <div className="skeleton-card"></div>
                <div className="skeleton-card"></div>
              </div>
            ) : games.featured.length > 0 ? (
              <div className="featured-game-wrapper">
                <GameCard game={games.featured[0]} featured={true} />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Categories Sections */}
      {categorySections.map((section) => (
        <section key={section.id} className="games-section">
          <div className="container">
            <div className="section-header">
              <div>
                <h2 className="section-title">{section.title}</h2>
                <p className="section-description">{section.description}</p>
              </div>
              <Link to={section.viewAllLink} className="view-all-link">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" fill="currentColor"/>
                </svg>
              </Link>
            </div>

            {isLoading ? (
              <div className="games-grid">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="skeleton-card"></div>
                ))}
              </div>
            ) : games[section.id]?.length > 0 ? (
              <div className="games-grid">
                {games[section.id].map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            ) : (
              <div className="no-games-message">No games available in this category yet.</div>
            )}
          </div>
        </section>
      ))}

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Stay Updated</h2>
            <p className="newsletter-description">
              Get notified about new game releases and exclusive offers
            </p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="newsletter-input"
                aria-label="Email address for newsletter"
                required
              />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 