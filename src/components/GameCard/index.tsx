import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Rating,
  CardActionArea,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Game } from '../../types/game';
import { styled } from '@mui/material/styles';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import CloseIcon from '@mui/icons-material/Close';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    cursor: 'pointer',
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 0,
  paddingTop: '56.25%', // 16:9 宽高比
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

const BadgeOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  display: 'flex',
  gap: theme.spacing(1),
}));

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showConnectionIssue, setShowConnectionIssue] = useState(false);

  const handleCardClick = () => {
    // 模拟连接检查
    const hasConnection = Math.random() > 0.3; // 70%概率连接成功
    if (hasConnection) {
      window.open(game.url, '_blank');
    } else {
      setShowConnectionIssue(true);
    }
  };

  const handleDialogOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleContinueOffline = () => {
    setShowConnectionIssue(false);
    window.open(game.url, '_blank');
  };

  const handleReloadGame = () => {
    setShowConnectionIssue(false);
    handleCardClick();
  };

  const handleClick = () => {
    navigate(`/game/${game.id}`, { state: { game } });
  };

  return (
    <>
      <StyledCard onClick={handleCardClick}>
        <StyledCardMedia
          sx={{ height: 140 }}
          image={`https://picsum.photos/seed/${game.id}/400/250`}
          title={game.title}
        />
        <BadgeOverlay>
          {game.isHot && (
            <Chip
              icon={<WhatshotIcon />}
              label={t('game.hot')}
              color="error"
              size="small"
            />
          )}
          {game.isNew && (
            <Chip
              icon={<NewReleasesIcon />}
              label={t('game.new')}
              color="success"
              size="small"
            />
          )}
        </BadgeOverlay>
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography gutterBottom variant="h6" component="h2" noWrap>
            {game.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {game.description}
          </Typography>
          <Box sx={{ mt: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Rating value={game.rating} precision={0.5} size="small" readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {game.rating?.toFixed(1)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              <Chip
                label={game.category}
                size="small"
                color="primary"
                variant="outlined"
              />
              {game.tags?.slice(0, 2).map((tag: string) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  variant="outlined"
                  onClick={handleDialogOpen}
                />
              ))}
            </Box>
          </Box>
        </CardContent>
      </StyledCard>

      {/* 连接问题对话框 */}
      <Dialog
        open={showConnectionIssue}
        onClose={() => setShowConnectionIssue(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'background.paper',
            borderRadius: 2,
          }
        }}
      >
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" component="h2" gutterBottom>
            {t('connection.issues')}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            {t('connection.issues.desc')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="outlined"
              onClick={handleContinueOffline}
              sx={{ minWidth: 120 }}
            >
              {t('connection.offline')}
            </Button>
            <Button
              variant="contained"
              onClick={handleReloadGame}
              sx={{ minWidth: 120 }}
            >
              {t('connection.reload')}
            </Button>
          </Box>
        </Box>
      </Dialog>

      {/* 游戏详情对话框 */}
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {game.title}
          <IconButton
            aria-label="close"
            onClick={handleDialogClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              {t('game.description')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {game.description}
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              {t('game.category')}
            </Typography>
            <Chip label={game.category} color="primary" />
          </Box>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              {t('game.tags')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {game.tags.map((tag) => (
                <Chip key={tag} label={tag} variant="outlined" />
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>{t('dialog.close')}</Button>
          <Button variant="contained" onClick={handleCardClick}>
            {t('game.play')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GameCard; 