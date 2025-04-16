import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../types/game';
import '../styles/GameCard.css';

interface GameCardProps {
  game: Game;
  featured?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, featured = false }) => {
  // Default thumbnail if not provided
  const thumbnail = game.thumbnailUrl || 
    // Extract thumbnail from iframe if possible, otherwise use default
    (game.iframeCode && game.iframeCode.includes('src="') 
      ? `https://img.crazygames.com/games${game.iframeCode.split('src="')[1].split('/index.html')[0]}/thumb.png`
      : '/images/default-game-thumbnail.jpg');
  
  return (
    <article 
      className={`game-card ${featured ? 'featured' : ''}`}
      itemScope 
      itemType="https://schema.org/Game"
    >
      <Link 
        to={`/game/${game.slug}`} 
        className="game-card-link" 
        aria-label={`Play ${game.name}`}
      >
        <div className="game-thumbnail">
          <img 
            src={thumbnail} 
            alt={`${game.name} game thumbnail`} 
            loading="lazy"
            width="280"
            height="168"
            itemProp="image"
          />

          {game.isNew && (
            <span className="game-badge new-badge">New</span>
          )}
          
          {game.popular && (
            <span className="game-badge popular-badge">Hot</span>
          )}
          
          <div className="play-indicator">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5v14l11-7z" fill="currentColor"/>
            </svg>
          </div>
        </div>

        <div className="game-info">
          <h3 className="game-title" itemProp="name">{game.name}</h3>
          
          <div className="game-meta">
            {game.category && (
              <span className="game-category" itemProp="genre">{game.category}</span>
            )}
            
            {game.rating !== undefined && (
              <div className="game-rating" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                <span className="rating-stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < Math.round(game.rating || 0) ? 'filled' : ''}`}>★</span>
                  ))}
                </span>
                <meta itemProp="ratingValue" content={game.rating.toString()} />
                <meta itemProp="bestRating" content="5" />
              </div>
            )}
            
            {game.plays !== undefined && game.plays > 0 && (
              <span className="game-plays">
                {game.plays > 1000 
                  ? `${Math.floor(game.plays / 1000)}K plays` 
                  : `${game.plays} plays`}
              </span>
            )}
          </div>
          
          {featured && game.description && (
            <p className="game-description" itemProp="description">
              {game.description.length > 120 
                ? `${game.description.substring(0, 120)}...` 
                : game.description}
            </p>
          )}
          
          {game.tags && game.tags.length > 0 && featured && (
            <div className="game-tags">
              {game.tags.slice(0, 3).map(tag => (
                <span key={tag} className="game-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </Link>
      
      {/* Hidden SEO-friendly metadata */}
      <meta itemProp="url" content={`https://tapgamenest.com/game/${game.slug}`} />
      <meta itemProp="datePublished" content={game.addedAt} />
    </article>
  );
};

export default GameCard; 