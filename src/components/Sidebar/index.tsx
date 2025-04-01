import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  SportsEsports as GamesIcon,
  Whatshot as TrendingIcon,
  Update as UpdatedIcon,
  Group as MultiplayerIcon,
  Person2 as SinglePlayerIcon,
  DirectionsCar as RacingIcon,
  Sports as SportsIcon,
  Casino as CardIcon,
} from '@mui/icons-material';

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const drawerWidth = 240;

const menuItems = [
  { text: '所有游戏', icon: <GamesIcon /> },
  { text: '热门游戏', icon: <TrendingIcon /> },
  { text: '最新更新', icon: <UpdatedIcon /> },
  { text: '多人游戏', icon: <MultiplayerIcon /> },
  { text: '单人游戏', icon: <SinglePlayerIcon /> },
  { text: '赛车游戏', icon: <RacingIcon /> },
  { text: '体育游戏', icon: <SportsIcon /> },
  { text: '卡牌游戏', icon: <CardIcon /> },
];

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onClose }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem button key={item.text}>
          <ListItemIcon sx={{ color: 'primary.main' }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <Drawer
        variant={isDesktop ? 'permanent' : 'temporary'}
        open={mobileOpen}
        onClose={onClose}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'background.paper',
            borderRight: '1px solid rgba(255, 255, 255, 0.12)',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar; 