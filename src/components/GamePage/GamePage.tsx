import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  Box, 
  Typography, 
  IconButton, 
  CircularProgress,
  Rating,
  Chip,
  Grid,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { games } from '../../routes';

const GamePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 从路由状态或通过ID查找游戏
  const game = location.state?.game || games.find(g => g.id === id);

  if (!game) {
    return (
      <Container>
        <Typography variant="h4" color="error" sx={{ mt: 4, textAlign: 'center' }}>
          游戏未找到
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <IconButton onClick={() => navigate('/')} color="primary">
            <CloseIcon />
          </IconButton>
        </Box>
      </Container>
    );
  }

  const handleClose = () => {
    navigate('/');
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setError('游戏加载失败，请稍后重试');
    setIsLoading(false);
  };

  return (
    <Container maxWidth="xl">
      {/* 游戏标题和基本信息 */}
      <Box sx={{ mb: 4, mt: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Typography variant="h1" sx={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
              {game.title}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose} size="large">
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <Chip label={game.category} color="primary" />
          {game.isNew && <Chip label="NEW" color="success" />}
          {game.isHot && <Chip label="HOT" color="error" />}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
            <Rating value={game.rating || 4.5} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary">
              ({game.rating || 4.5})
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 游戏内容区域 */}
      <Paper 
        elevation={3} 
        sx={{ 
          position: 'relative',
          mb: 4,
          bgcolor: 'background.paper',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
          {isLoading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.paper',
                zIndex: 1,
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {error && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.paper',
                zIndex: 1,
              }}
            >
              <Typography color="error">{error}</Typography>
            </Box>
          )}
          <iframe
            src={game.url}
            title={game.title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            allowFullScreen
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-presentation"
          />
        </Box>
      </Paper>

      {/* 游戏详细信息 */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h2" sx={{ mb: 2, fontSize: '1.75rem' }}>
          关于 {game.title}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="body1" paragraph>
              {game.title} 是一款精彩的{game.category}类游戏。这是一个完全免费的在线游戏，您可以直接在浏览器中开始游戏，无需下载任何内容。
            </Typography>
            <Typography variant="body1" paragraph>
              游戏特点：
            </Typography>
            <ul>
              <li>
                <Typography variant="body1">
                  完全免费 - 无需下载，直接在浏览器中游玩
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  {game.category}游戏 - 享受精彩的游戏体验
                </Typography>
              </li>
              {game.isNew && (
                <li>
                  <Typography variant="body1">
                    全新上线 - 体验最新的游戏内容
                  </Typography>
                </li>
              )}
              {game.isHot && (
                <li>
                  <Typography variant="body1">
                    热门游戏 - 备受玩家欢迎
                  </Typography>
                </li>
              )}
            </ul>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                游戏信息
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    类别
                  </Typography>
                  <Typography variant="body2">
                    {game.category}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    评分
                  </Typography>
                  <Typography variant="body2">
                    {game.rating || 4.5} / 5.0
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    状态
                  </Typography>
                  <Typography variant="body2">
                    {game.isNew ? '新游戏' : game.isHot ? '热门' : '上线中'}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default GamePage; 