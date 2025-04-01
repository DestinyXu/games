import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Rating, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { games, Game } from '../../routes';

const GameSection = ({ title, games, showMore, onShowMore }: { 
  title: string; 
  games: Game[]; 
  showMore: string;
  onShowMore: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h2">{title}</Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'primary.main',
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' },
          }}
          onClick={onShowMore}
        >
          {showMore}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {games.map((game) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={game.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/game/${game.id}`)}
            >
              <CardMedia
                component="img"
                height="160"
                image={`/games/${game.id}.jpg`}
                alt={game.title}
                sx={{
                  objectFit: 'cover',
                }}
              />
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography gutterBottom variant="h6" component="div" noWrap>
                  {game.title}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {game.category}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Rating value={game.rating || 4.5} precision={0.1} size="small" readOnly />
                    <Typography variant="body2" color="text.secondary">
                      {game.rating || 4.5}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {game.isNew && (
                    <Chip
                      label="NEW"
                      size="small"
                      color="success"
                      sx={{ height: 20 }}
                    />
                  )}
                  {game.isHot && (
                    <Chip
                      label="HOT"
                      size="small"
                      color="error"
                      sx={{ height: 20 }}
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const MainContent = () => {
  const [showAllNew, setShowAllNew] = useState(false);
  const [showAllTopRated, setShowAllTopRated] = useState(false);

  const newGames = [...games].reverse().slice(0, showAllNew ? undefined : 8);
  const topRatedGames = [...games]
    .sort((a, b) => ((b.rating || 4.5) - (a.rating || 4.5)))
    .slice(0, showAllTopRated ? undefined : 8);

  return (
    <Box>
      <GameSection 
        title="New Games" 
        games={newGames} 
        showMore={showAllNew ? "Show Less ←" : "More →"} 
        onShowMore={() => setShowAllNew(!showAllNew)}
      />
      <GameSection 
        title="Top Rated Games" 
        games={topRatedGames} 
        showMore={showAllTopRated ? "Show Less ←" : "More →"} 
        onShowMore={() => setShowAllTopRated(!showAllTopRated)}
      />
    </Box>
  );
};

export default MainContent; 