import React from 'react';
import { Game } from '../../routes';

interface GameHtmlProps {
  game: Game;
}

const GameHtml: React.FC<GameHtmlProps> = ({ game }) => {
  // 生成游戏描述
  const generateDescription = (game: Game) => {
    const features = [];
    if (game.isNew) features.push('全新上线');
    if (game.isHot) features.push('热门游戏');
    features.push('免费在线游玩');
    
    return `${game.title} 是一款精彩的${game.category}类游戏。${features.join('，')}，无需下载即可开始游戏。游戏评分${game.rating || 4.5}分，深受玩家喜爱。`;
  };

  // 生成关键词
  const generateKeywords = (game: Game) => {
    const keywords = [
      game.title,
      game.category,
      '免费游戏',
      '在线游戏',
      '网页游戏',
      'HTML5游戏',
      '浏览器游戏'
    ];
    if (game.isNew) keywords.push('新游戏');
    if (game.isHot) keywords.push('热门游戏');
    return keywords.join(',');
  };

  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{game.title} - 免费在线{game.category}游戏 | 无需下载</title>
        
        {/* 基础SEO标签 */}
        <meta name="description" content={generateDescription(game)} />
        <meta name="keywords" content={generateKeywords(game)} />
        <meta name="author" content="在线游戏平台" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph标签 */}
        <meta property="og:title" content={`${game.title} - 免费在线${game.category}游戏`} />
        <meta property="og:description" content={generateDescription(game)} />
        <meta property="og:image" content={`/games/${game.id}.jpg`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://your-domain.com/game/${game.id}`} />
        <meta property="og:site_name" content="在线游戏平台" />
        
        {/* Twitter Card标签 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${game.title} - 免费在线${game.category}游戏`} />
        <meta name="twitter:description" content={generateDescription(game)} />
        <meta name="twitter:image" content={`/games/${game.id}.jpg`} />
        
        {/* 结构化数据 */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoGame",
            "name": game.title,
            "genre": game.category,
            "gamePlatform": "Browser",
            "applicationCategory": "Game",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": game.rating || 4.5,
              "bestRating": "5",
              "worstRating": "1",
              "ratingCount": "1000"
            },
            "image": `/games/${game.id}.jpg`,
            "description": generateDescription(game),
            "keywords": generateKeywords(game),
            "url": `https://your-domain.com/game/${game.id}`,
            "datePublished": new Date().toISOString(),
            "dateModified": new Date().toISOString()
          })}
        </script>
        
        {/* 其他meta标签 */}
        <meta name="theme-color" content="#1976d2" />
        <link rel="canonical" href={`https://your-domain.com/game/${game.id}`} />
        
        <style>{`
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }
          .game-title {
            font-size: 2.5rem;
            margin-bottom: 1rem;
          }
          .game-meta {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
          }
          .tag {
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 14px;
          }
          .tag-category {
            background-color: #1976d2;
            color: white;
          }
          .tag-new {
            background-color: #2e7d32;
            color: white;
          }
          .tag-hot {
            background-color: #d32f2f;
            color: white;
          }
          .game-frame {
            position: relative;
            padding-top: 56.25%;
            margin-bottom: 2rem;
            background: #f5f5f5;
          }
          .game-frame iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
          }
          .game-info {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 2rem;
          }
          .game-description {
            background: #fff;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .game-stats {
            background: #fff;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .stat-item {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
            border-bottom: 1px solid #eee;
          }
          .stat-label {
            color: #666;
          }
          @media (max-width: 768px) {
            .game-info {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <h1 className="game-title">{game.title}</h1>
          <div className="game-meta">
            <span className="tag tag-category">{game.category}</span>
            {game.isNew && <span className="tag tag-new">NEW</span>}
            {game.isHot && <span className="tag tag-hot">HOT</span>}
            <span>评分: {game.rating || 4.5}/5.0</span>
          </div>
          
          <div className="game-frame">
            <iframe
              src={game.url}
              title={game.title}
              allowFullScreen
              sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-presentation"
            />
          </div>

          <div className="game-info">
            <div className="game-description">
              <h2>关于 {game.title}</h2>
              <p>{game.title} 是一款精彩的{game.category}类游戏。这是一个完全免费的在线游戏，您可以直接在浏览器中开始游戏，无需下载任何内容。</p>
              <h3>游戏特点：</h3>
              <ul>
                <li>完全免费 - 无需下载，直接在浏览器中游玩</li>
                <li>{game.category}游戏 - 享受精彩的游戏体验</li>
                {game.isNew && <li>全新上线 - 体验最新的游戏内容</li>}
                {game.isHot && <li>热门游戏 - 备受玩家欢迎</li>}
              </ul>
            </div>
            
            <div className="game-stats">
              <h3>游戏信息</h3>
              <div className="stat-item">
                <span className="stat-label">类别</span>
                <span>{game.category}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">评分</span>
                <span>{game.rating || 4.5} / 5.0</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">状态</span>
                <span>{game.isNew ? '新游戏' : game.isHot ? '热门' : '上线中'}</span>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default GameHtml; 