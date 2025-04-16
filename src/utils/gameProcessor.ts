import { Game } from '../types/game';

// Sample categories to use for games without categories
const GAME_CATEGORIES = [
  'Action', 'Adventure', 'Arcade', 'Board', 'Card', 'Casino',
  'Educational', 'Fighting', 'Multiplayer', 'Puzzle', 'Racing',
  'RPG', 'Shooting', 'Simulation', 'Sports', 'Strategy'
];

// Sample tags for games
const GAME_TAGS = [
  'Casual', 'Fantasy', 'Survival', 'Platformer', '3D', '2D', 
  'Pixel Art', 'Horror', 'Sci-Fi', 'War', 'Zombies', 'Medieval',
  'Space', 'Physics', 'Multiplayer', 'Racing', 'Fighting', 'Time Management'
];

// Map to ensure unique slugs
const usedSlugs = new Map<string, number>();

/**
 * Generate a unique slug
 */
const generateUniqueSlug = (baseSlug: string): string => {
  // If this slug hasn't been used yet, use it
  if (!usedSlugs.has(baseSlug)) {
    usedSlugs.set(baseSlug, 1);
    return baseSlug;
  }
  
  // If this slug has been used, add a number suffix
  const count = usedSlugs.get(baseSlug)! + 1;
  usedSlugs.set(baseSlug, count);
  return `${baseSlug}-${count}`;
};

/**
 * Process raw game data from CSV into structured game objects
 */
export const processGameData = (rawGamesData: any[]): Game[] => {
  const processedGames: Game[] = [];
  
  // Clear used slugs for a fresh start
  usedSlugs.clear();

  // First, handle specific game mappings
  const gameSlugMap: Record<string, string> = {
    'Letter Clash': 'letter-clash',
    'Survival Rush': 'survival-rush',
    'Team Order Racing Manager': 'team-order-racing-manager',
    'Murder': 'murder',
    'Playground': 'playground',
    'Dino Crowd': 'dino-crowd',
    'War Groups': 'war-groups',
    'Crusher Block': 'crusher-block',
    'Fashion Week 2025': 'fashion-week-2025',
    'Knock and Run': 'knock-and-run',
    'RPG Idle Clicker': 'rpg-idle-clicker',
    'Penguin Restaurant': 'penguin-restaurant',
    'Pirates of the Caribbean': 'pirates-of-the-caribbean',
    'Real Fishing Simulator': 'real-fishing-simulator',
    'Machine Room Escape': 'machine-room-escape',
    'Murder Mafia': 'murder-mafia',
    'Lime Playground Sandbox': 'lime-playground-sandbox',
    'Robox': 'robox'
  };
  
  rawGamesData.forEach((row, index) => {
    if (!row.id) return; // Skip empty rows
    
    // Extract game info - handling both array format and object format
    const id = row.id || `game-${index + 1}`;
    const name = row.name || `Awesome Game ${index + 1}`;
    const iframeCode = row.iframeCode || '';
    
    if (!iframeCode) return; // Skip rows without iframe code
    
    // Extract game URL from iframe src attribute if present
    const srcMatch = iframeCode.match(/src="([^"]+)"/);
    const gameUrl = srcMatch ? srcMatch[1] : '';
    
    if (!gameUrl) return; // Skip if no game URL found
    
    // Generate slug - use predefined mapping if available
    let slug = '';
    
    // 1. Check if we have a predefined mapping for this game
    if (name in gameSlugMap) {
      slug = gameSlugMap[name];
    }
    // 2. If row has a slug, use it
    else if (row.slug) {
      slug = row.slug;
    }
    // 3. Try to extract slug from URL path
    else {
      const urlParts = gameUrl.split('/');
      // The game name is usually the second-to-last part before index.html
      const gameNameFromUrl = urlParts[urlParts.length - 2] || '';
      
      if (gameNameFromUrl && gameNameFromUrl !== 'en_US' && gameNameFromUrl !== 'en') {
        slug = gameNameFromUrl;
      } else {
        // Fallback to name-based slug
        slug = name.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/^-+|-+$/g, '');
      }
    }
    
    // Ensure slug is unique
    slug = generateUniqueSlug(slug);
    
    // Assign a category based on given category or default to Action
    const category = row.category || getRandomItem(GAME_CATEGORIES);
    
    // Generate some random data for demo purposes
    const isNew = Math.random() > 0.7;
    const isPopular = Math.random() > 0.6;
    const isFeatured = Math.random() > 0.8;
    const rating = Math.round((3 + Math.random() * 2) * 10) / 10; // Rating between 3.0 and 5.0
    const plays = Math.floor(Math.random() * 50000) + 1000; // Random number of plays
    
    // Create randomized added date (within the last 3 months)
    const daysAgo = Math.floor(Math.random() * 90);
    const addedDate = new Date();
    addedDate.setDate(addedDate.getDate() - daysAgo);
    
    // Generate random tags
    const numberOfTags = Math.floor(Math.random() * 4) + 1; // 1 to 4 tags
    const tags: string[] = [];
    for (let i = 0; i < numberOfTags; i++) {
      const tag = getRandomItem(GAME_TAGS);
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    }
    
    // Extract thumbnail URL if possible
    const thumbnailUrl = gameUrl ? 
      `https://img.crazygames.com/games${gameUrl.split('/index.html')[0].replace('/en_US', '')}/thumb.png` : 
      undefined;
    
    // Create game object
    const game: Game = {
      id: String(id),
      name: formatGameName(name),
      slug,
      category,
      iframeCode,
      thumbnailUrl,
      tags,
      rating,
      plays,
      isNew,
      popular: isPopular,
      featured: isFeatured,
      addedAt: addedDate.toISOString(),
      description: generateGameDescription(name, category, tags),
    };
    
    console.log(`Processed game: ${name} with slug: ${slug}`);
    processedGames.push(game);
  });
  
  return processedGames;
};

/**
 * Format the game name to look better
 */
const formatGameName = (name: string): string => {
  return name
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Generate a simple description for a game
 */
const generateGameDescription = (name: string, category: string, tags: string[]): string => {
  const descriptions = [
    `${name} is an exciting ${category.toLowerCase()} game where you can test your skills and enjoy hours of entertainment.`,
    `Experience the thrill of ${tags.join(' and ')} in this amazing ${category.toLowerCase()} game. ${name} will keep you hooked for hours!`,
    `${name} combines ${tags.slice(0, 2).join(' and ')} elements in a unique ${category.toLowerCase()} experience. Play now and challenge yourself!`,
    `Get ready for an incredible adventure in ${name}, a ${category.toLowerCase()} game featuring ${tags.join(', ')} elements that will test your skills.`,
    `Dive into the world of ${name}, where ${tags.join(' meets ')} in an epic ${category.toLowerCase()} gameplay experience.`
  ];
  
  return getRandomItem(descriptions);
};

/**
 * Get a random item from an array
 */
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
}; 