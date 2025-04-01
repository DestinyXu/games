import React, { useCallback, useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputBase,
  Chip,
  Stack,
  Menu,
  MenuItem,
  Alert,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../i18n/config';
import { games } from '../../routes';
import GameCard from '../GameCard';
import { useDebounce } from '../../hooks/useDebounce';
import { Game } from '../../types/game';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: '100%',
  maxWidth: '400px',
  transition: theme.transitions.create(['background-color', 'box-shadow']),
  '&:focus-within': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

const Layout: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [languageMenu, setLanguageMenu] = React.useState<null | HTMLElement>(null);

  const handleSearch = useCallback((games: Game[], searchTermLower: string) => {
    return games.filter(game => 
      game.title.toLowerCase().includes(searchTermLower) ||
      game.category.toLowerCase().includes(searchTermLower) ||
      (game.description && game.description.toLowerCase().includes(searchTermLower)) ||
      (game.tags && game.tags.some((tag: string) => tag.toLowerCase().includes(searchTermLower)))
    );
  }, []);

  useEffect(() => {
    const searchTermLower = debouncedSearchTerm.toLowerCase();
    const filtered = handleSearch(games, searchTermLower);
    setFilteredGames(filtered);
  }, [debouncedSearchTerm, handleSearch]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageMenu(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenu(null);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    handleLanguageMenuClose();
  };

  const categories = Array.from(new Set(games.map(game => game.category)));
  const newGames = games.filter(game => game.isNew);
  const hotGames = games.filter(game => game.isHot);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            component={Link} 
            to="/"
            sx={{ 
              flexGrow: 0,
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mr: 4
            }}
          >
            <SportsEsportsIcon />
            TapGameNest
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={t('nav.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                '& .MuiInputBase-input': {
                  '&::placeholder': {
                    opacity: 0.7,
                  },
                },
              }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            component={Link}
            to="/submit"
            color="inherit"
            sx={{ mr: 2 }}
          >
            {t('nav.submit')}
          </Button>
          <Button
            component={Link}
            to="/sponsor"
            color="inherit"
            sx={{ mr: 2 }}
          >
            {t('nav.sponsor')}
          </Button>
          <Button
            color="inherit"
            onClick={handleLanguageMenuOpen}
            endIcon={<KeyboardArrowDownIcon />}
            startIcon={<LanguageIcon />}
            sx={{ mr: 2 }}
          >
            {LANGUAGES[i18n.language as keyof typeof LANGUAGES]?.label || 'English'}
          </Button>
          <Menu
            anchorEl={languageMenu}
            open={Boolean(languageMenu)}
            onClose={handleLanguageMenuClose}
            sx={{
              '& .MuiPaper-root': {
                backgroundColor: 'background.paper',
                minWidth: 120,
              }
            }}
          >
            {Object.entries(LANGUAGES).map(([code, { nativeName }]) => (
              <MenuItem
                key={code}
                onClick={() => changeLanguage(code)}
                selected={i18n.language === code}
              >
                {nativeName}
              </MenuItem>
            ))}
          </Menu>
          <Button 
            variant="contained" 
            color="primary"
            sx={{ mr: 1 }}
          >
            {t('nav.login')}
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        onClose={handleDrawerClose}
        sx={{
          width: 280,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 2 }}>
              {t('category.title')}
            </Typography>
          </Box>
          <List>
            <ListItem button component={Link} to="/" onClick={handleDrawerClose}>
              <ListItemIcon>
                <NewReleasesIcon color="success" />
              </ListItemIcon>
              <ListItemText 
                primary={t('nav.newGames')}
                secondary={t('category.games', { count: newGames.length })}
              />
            </ListItem>
            <ListItem button component={Link} to="/" onClick={handleDrawerClose}>
              <ListItemIcon>
                <WhatshotIcon color="error" />
              </ListItemIcon>
              <ListItemText 
                primary={t('nav.hotGames')}
                secondary={t('category.games', { count: hotGames.length })}
              />
            </ListItem>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ px: 2, mb: 1 }}>
                {t('category.title')}
              </Typography>
              {categories.map((category) => (
                <ListItem button key={category} onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <SportsEsportsIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={category}
                    secondary={t('category.games', { count: games.filter(g => g.category === category).length })}
                  />
                </ListItem>
              ))}
            </Box>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          mt: 8
        }}
      >
        {location.pathname === '/' ? (
          <Container maxWidth="xl">
            <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}>
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  clickable
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              ))}
            </Stack>
            
            {(!debouncedSearchTerm || filteredGames.some(game => game.isNew)) && (
              <Box sx={{ mb: 6 }}>
                <Typography variant="h1" gutterBottom>
                  {t('section.new')}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" paragraph>
                  {t('section.new.desc')}
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gap: 3,
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(3, 1fr)',
                      lg: 'repeat(4, 1fr)',
                    },
                  }}
                >
                  {filteredGames.filter(game => game.isNew).map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </Box>
              </Box>
            )}
            
            {(!debouncedSearchTerm || filteredGames.some(game => game.isHot)) && (
              <Box sx={{ mb: 6 }}>
                <Typography variant="h1" gutterBottom>
                  {t('section.hot')}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" paragraph>
                  {t('section.hot.desc')}
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gap: 3,
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(3, 1fr)',
                      lg: 'repeat(4, 1fr)',
                    },
                  }}
                >
                  {filteredGames.filter(game => game.isHot).map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </Box>
              </Box>
            )}

            <Box sx={{ mb: 6 }}>
              <Typography variant="h1" gutterBottom>
                {debouncedSearchTerm ? `${t('section.search.results')} "${debouncedSearchTerm}"` : t('section.all')}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" paragraph>
                {debouncedSearchTerm ? 
                  `${filteredGames.length} ${t('category.games', { count: filteredGames.length })}` : 
                  t('section.all.desc')
                }
              </Typography>
              
              {filteredGames.length === 0 ? (
                <Alert 
                  severity="info" 
                  sx={{ 
                    maxWidth: 'sm',
                    mx: 'auto',
                    mt: 4,
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  {t('search.no.results')}
                </Alert>
              ) : (
                <Box
                  sx={{
                    display: 'grid',
                    gap: 3,
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(3, 1fr)',
                      lg: 'repeat(4, 1fr)',
                    },
                  }}
                >
                  {filteredGames.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </Box>
              )}
            </Box>
          </Container>
        ) : (
          <Outlet />
        )}
      </Box>
    </Box>
  );
};

export default Layout; 