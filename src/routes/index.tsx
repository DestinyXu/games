import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import SubmitGame from '../components/SubmitGame';
import Sponsor from '../components/Sponsor';
import { Game } from '../types/game';

export const games: Game[] = [
  {
    id: 1,
    title: "Super Mario Bros",
    category: "Action",
    description: "Classic platformer game",
    imageUrl: "https://via.placeholder.com/300x200",
    rating: 4.8,
    isNew: true,
    isHot: true,
    tags: ["platformer", "classic", "adventure"]
  },
  {
    id: 2,
    title: "Minecraft",
    category: "Adventure",
    description: "Build and explore infinite worlds",
    imageUrl: "https://via.placeholder.com/300x200",
    rating: 4.9,
    isNew: false,
    isHot: true,
    tags: ["sandbox", "survival", "creative"]
  },
  {
    id: 3,
    title: "Tetris",
    category: "Puzzle",
    description: "Classic block-matching puzzle game",
    imageUrl: "https://via.placeholder.com/300x200",
    rating: 4.7,
    isNew: false,
    isHot: true,
    tags: ["puzzle", "classic", "strategy"]
  },
  {
    id: 4,
    title: "Pac-Man",
    category: "Arcade",
    description: "Iconic maze chase arcade game",
    imageUrl: "https://via.placeholder.com/300x200",
    rating: 4.6,
    isNew: false,
    isHot: false,
    tags: ["arcade", "classic", "maze"]
  },
  {
    id: 5,
    title: "Portal",
    category: "Puzzle",
    description: "First-person puzzle-platform game",
    imageUrl: "https://via.placeholder.com/300x200",
    rating: 4.9,
    isNew: true,
    isHot: true,
    tags: ["puzzle", "first-person", "sci-fi"]
  }
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "submit",
        element: <SubmitGame />,
      },
      {
        path: "sponsor",
        element: <Sponsor />,
      },
    ],
  },
]);

export default router; 