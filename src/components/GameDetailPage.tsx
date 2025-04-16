import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Game } from '../types/game';
import GameCard from './GameCard';
import '../styles/GameDetailPage.css';
import { processGameData } from '../utils/gameProcessor';

const GameDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const [relatedGames, setRelatedGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGameLoaded, setIsGameLoaded] = useState(false);
  const [gameplayStarted, setGameplayStarted] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  console.log(`Current slug: ${slug}`);

  // Reset everything when slug changes
  useEffect(() => {
    console.log("Loading game with slug:", slug);
    // Reset scroll position when navigating to a new game
    window.scrollTo(0, 0);
    setIsLoading(true);
    setIsGameLoaded(false);
    setGameplayStarted(false);
    setConnectionError(false);
    setOfflineMode(false);

    // In a real app, this would be an API call
    const fetchGameDetails = async () => {
      try {
        // This would be replaced with an actual API call
        const response = await fetch('/data/games.json');
        const games = await response.json();
        
        // Process games from the data
        const processedGames = processGameData(games);
        
        // Find the current game
        const currentGame = processedGames.find(g => g.slug === slug);
        
        if (currentGame) {
          console.log("Found game:", currentGame.name);
          setGame(currentGame);
          
          // Find related games (same category or with similar tags)
          const related = processedGames
            .filter(g => g.id !== currentGame.id && 
              (g.category === currentGame.category || 
               g.tags?.some(tag => currentGame.tags?.includes(tag))))
            .slice(0, 6);
          
          setRelatedGames(related);
        } else {
          console.error("Game not found for slug:", slug);
          navigate('/not-found');
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching game details:', error);
        setIsLoading(false);
      }
    };

    fetchGameDetails();
  }, [slug, navigate]); // Make sure to include slug in dependencies

  const handleIframeLoad = useCallback(() => {
    console.log(`游戏iframe加载成功: ${slug}`);
    setIsGameLoaded(true);
    setConnectionError(false);
  }, [slug]);

  const handleIframeError = useCallback(() => {
    console.error(`游戏iframe加载失败: ${slug}`);
    setConnectionError(true);
  }, [slug]);

  const handleStartGameplay = () => {
    console.log("Starting gameplay");
    setGameplayStarted(true);
    
    // Track gameplay start for analytics (in a real app)
    if (game) {
      console.log(`Game started: ${game.name}`);
      // In a real app, you would send this to your analytics service
      // analyticsService.trackEvent('game_started', { gameId: game.id, gameName: game.name });
    }
  };

  const handleContinueOffline = useCallback(() => {
    setOfflineMode(true);
    setConnectionError(false);
  }, []);

  const handleReloadGame = useCallback(() => {
    if (iframeRef.current) {
      const src = iframeRef.current.src;
      iframeRef.current.src = '';
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = src;
        }
      }, 100);
    }
    setConnectionError(false);
  }, []);

  // Handler for clicking related games
  const handleRelatedGameClick = useCallback((gameSlug: string) => {
    navigate(`/game/${gameSlug}`);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading game...</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="error-container">
        <h2>Game Not Found</h2>
        <p>Sorry, the game you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  // Generate a meta description for SEO
  const metaDescription = game.description || 
    `Play ${game.name} online at TapGameNest - Free and instant gameplay without downloads. ${game.category || 'Online'} game with high-quality graphics and engaging gameplay.`;

  // Extract src URL from iframe code
  const iframeSrc = game.iframeCode.match(/src="([^"]+)"/)?.[1] || '';

  return (
    <>
      <Helmet>
        <title>{`Play ${game.name} Online | TapGameNest`}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={`Play ${game.name} | TapGameNest`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://tapgamenest.com/game/${game.slug}`} />
        {game.thumbnailUrl && <meta property="og:image" content={game.thumbnailUrl} />}
        <link rel="canonical" href={`https://tapgamenest.com/game/${game.slug}`} />
      </Helmet>

      <div className="game-detail-page">
        <div className="container">
          <div className="game-detail-header">
            <div className="breadcrumbs">
              <Link to="/">Home</Link>
              {game.category && (
                <>
                  <span className="breadcrumb-separator">/</span>
                  <Link to={`/category/${game.category.toLowerCase()}`}>{game.category}</Link>
                </>
              )}
              <span className="breadcrumb-separator">/</span>
              <span className="current-page">{game.name}</span>
            </div>
            
            <h1 className="game-title" itemProp="name">{game.name}</h1>
            
            {game.category && (
              <div className="game-categories">
                <Link 
                  to={`/category/${game.category.toLowerCase()}`} 
                  className="game-category-link"
                >
                  {game.category}
                </Link>
              </div>
            )}
          </div>

          <div 
            className="game-content-wrapper" 
            itemScope 
            itemType="https://schema.org/VideoGame"
          >
            <div className="game-container">
              {!gameplayStarted ? (
                <div className="game-preview">
                  <img 
                    src={game.thumbnailUrl || '/images/default-game-thumbnail.jpg'} 
                    alt={`${game.name} thumbnail`}
                    className="game-thumbnail-preview"
                    loading="eager"
                    itemProp="image"
                  />
                  <button 
                    className="play-game-btn"
                    onClick={handleStartGameplay}
                    aria-label={`Play ${game.name}`}
                  >
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5v14l11-7z" fill="currentColor"/>
                    </svg>
                    <span>Play Now</span>
                  </button>
                </div>
              ) : (
                <div className={`game-iframe-container ${isGameLoaded ? 'loaded' : ''}`}>
                  {connectionError && !offlineMode ? (
                    <div className="connection-error">
                      <div className="error-icon">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/>
                        </svg>
                      </div>
                      <h3>Connection issues</h3>
                      <p>Oops, we're having troubles connecting you. Any progress you make will be lost. Try reloading the game to solve the issue.</p>
                      <div className="user-action-guide">
                        <p className="highlight-tip">👉 点击"Continue offline"立即开始游戏！</p>
                      </div>
                      <div className="error-actions">
                        <button onClick={handleContinueOffline} className="btn btn-primary">Continue offline</button>
                        <button onClick={handleReloadGame} className="btn btn-secondary">Reload game</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {!isGameLoaded && !offlineMode && (
                        <div className="game-loading">
                          <div className="loading-spinner"></div>
                          <p>Loading game...</p>
                        </div>
                      )}
                      {offlineMode ? (
                        <div className="offline-mode">
                          <iframe 
                            className="game-iframe"
                            src={iframeSrc}
                            width="100%" 
                            height="100%" 
                            frameBorder="0" 
                            allowFullScreen 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            title={game.name}
                            sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
                          ></iframe>
                        </div>
                      ) : (
                        <div className="game-iframe-wrapper">
                          <iframe 
                            className="game-iframe"
                            ref={iframeRef}
                            src={iframeSrc}
                            width="100%" 
                            height="100%" 
                            frameBorder="0" 
                            allowFullScreen 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            onLoad={handleIframeLoad}
                            onError={handleIframeError}
                            title={game.name}
                            sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
                          ></iframe>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
            
            <div className="game-sidebar">
              <div className="game-details">
                {game.description && (
                  <div className="game-description">
                    <h2>About {game.name}</h2>
                    <p itemProp="description">{game.description}</p>
                  </div>
                )}
                
                <div className="game-meta-info">
                  {game.rating !== undefined && (
                    <div className="game-rating-detail" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                      <h3>Rating</h3>
                      <div className="rating-stars">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`star ${i < Math.round(game.rating || 0) ? 'filled' : ''}`}>★</span>
                        ))}
                        <span className="rating-value">{game.rating.toFixed(1)}/5</span>
                      </div>
                      <meta itemProp="ratingValue" content={game.rating.toString()} />
                      <meta itemProp="bestRating" content="5" />
                    </div>
                  )}
                  
                  {game.plays !== undefined && (
                    <div className="game-plays-detail">
                      <h3>Plays</h3>
                      <p>{game.plays.toLocaleString()}</p>
                    </div>
                  )}
                  
                  {game.addedAt && (
                    <div className="game-added-date">
                      <h3>Added</h3>
                      <p itemProp="datePublished">{new Date(game.addedAt).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
                
                {game.tags && game.tags.length > 0 && (
                  <div className="game-tags">
                    <h3>Tags</h3>
                    <div className="tags-list">
                      {game.tags.map(tag => (
                        <Link key={tag} to={`/tags/${tag.toLowerCase()}`} className="game-tag">
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="game-actions">
                  <button className="btn btn-outline game-action-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
                    </svg>
                    Favorite
                  </button>
                  <button className="btn btn-outline game-action-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="currentColor"/>
                    </svg>
                    Share
                  </button>
                  <button className="btn btn-outline game-action-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
                    </svg>
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Games Section */}
          {relatedGames.length > 0 && (
            <section className="related-games-section">
              <h2 className="section-title">Similar Games You'll Love</h2>
              <div className="games-grid">
                {relatedGames.map(relatedGame => (
                  <GameCard key={relatedGame.id} game={relatedGame} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default GameDetailPage; 