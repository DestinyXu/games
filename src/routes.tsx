import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import GamePage from './components/GamePage';

// 游戏数据类型定义
export interface Game {
  id: string;
  title: string;
  url: string;
  category: string;
  rating?: number;
  isNew?: boolean;
  isHot?: boolean;
}

// 游戏数据
const games: Game[] = [
  {
    id: 'fashion-week-2025',
    title: 'Fashion Week 2025',
    url: 'https://games.crazygames.com/en_US/fashion-week-2025/index.html',
    category: 'Fashion',
    rating: 4.8,
    isNew: true
  },
  {
    id: 'knock-and-run',
    title: 'Knock and Run',
    url: 'https://games.crazygames.com/en_US/knock-and-run/index.html',
    category: 'Action',
    rating: 4.6,
    isHot: true
  },
  {
    id: 'survival-rush',
    title: 'Survival Rush',
    url: 'https://games.crazygames.com/en_US/survival-rush/index.html',
    category: 'Action',
    rating: 4.7,
    isHot: true
  },
  {
    id: 'rpg-idle-clicker-uzz',
    title: 'RPG Idle Clicker UZZ',
    url: 'https://games.crazygames.com/en_US/rpg-idle-clicker-uzz/index.html',
    category: 'RPG',
    rating: 4.5,
    isNew: true
  },
  {
    id: 'crusher-block-jwd',
    title: 'Crusher Block JWD',
    url: 'https://games.crazygames.com/en_US/crusher-block-jwd/index.html',
    category: 'Puzzle',
    rating: 4.3
  },
  {
    id: 'penguin-restaurant-mge',
    title: 'Penguin Restaurant MGE',
    url: 'https://games.crazygames.com/en_US/penguin-restaurant-mge/index.html',
    category: 'Simulation',
    rating: 4.6,
    isHot: true
  },
  {
    id: 'playground',
    title: 'Playground',
    url: 'https://games.crazygames.com/en_US/playground/index.html',
    category: 'Adventure',
    rating: 4.4
  },
  {
    id: 'team-order-racing-manager',
    title: 'Team Order Racing Manager',
    url: 'https://games.crazygames.com/en_US/team-order-racing-manager/index.html',
    category: 'Racing',
    rating: 4.2,
    isNew: true
  },
  {
    id: 'pirates-of-the-caribbean-tow',
    title: 'Pirates of the Caribbean Tow',
    url: 'https://games.crazygames.com/en_US/pirates-of-the-caribbean-tow/index.html',
    category: 'Adventure',
    rating: 4.7,
    isHot: true
  },
  {
    id: 'murder',
    title: 'Murder',
    url: 'https://games.crazygames.com/en_US/murder/index.html',
    category: 'Action',
    rating: 4.5
  },
  {
    id: 'dino-crowd',
    title: 'Dino Crowd',
    url: 'https://games.crazygames.com/en_US/dino-crowd/index.html',
    category: 'Casual',
    rating: 4.3,
    isNew: true
  },
  {
    id: 'real-fishing-simulator',
    title: 'Real Fishing Simulator',
    url: 'https://games.crazygames.com/en_US/real-fishing-simulator/index.html',
    category: 'Simulation',
    rating: 4.4
  },
  {
    id: 'machine-room-escape',
    title: 'Machine Room Escape',
    url: 'https://games.crazygames.com/en_US/machine-room-escape/index.html',
    category: 'Puzzle',
    rating: 4.2
  },
  {
    id: 'war-groups',
    title: 'War Groups',
    url: 'https://games.crazygames.com/en_US/war-groups/index.html',
    category: 'Strategy',
    rating: 4.6,
    isHot: true
  },
  {
    id: 'letterclash',
    title: 'Letterclash',
    url: 'https://games.crazygames.com/en_US/letterclash/index.html',
    category: 'Word',
    rating: 4.1
  },
  {
    id: 'murder-mafia',
    title: 'Murder Mafia',
    url: 'https://games.crazygames.com/en_US/murder-mafia/index.html',
    category: 'Action',
    rating: 4.5,
    isHot: true
  },
  {
    id: 'lime-playground-sandbox',
    title: 'Lime Playground Sandbox',
    url: 'https://games.crazygames.com/en_US/lime-playground-sandbox/index.html',
    category: 'Sandbox',
    rating: 4.4,
    isNew: true
  },
  {
    id: 'robox',
    title: 'Robox',
    url: 'https://games.crazygames.com/en_US/robox/index.html',
    category: 'Platform',
    rating: 4.3
  }
];

export { games };

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="game/:id" element={<GamePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes; 