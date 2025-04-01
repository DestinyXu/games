import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { games } from '../src/routes';
import GameHtml from '../src/components/GamePage/GameHtml';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.join(__dirname, '../public/games');

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 为每个游戏生成静态HTML页面
games.forEach(game => {
  const html = ReactDOMServer.renderToString(React.createElement(GameHtml, { game }));
  const filePath = path.join(OUTPUT_DIR, `${game.id}.html`);
  
  // 添加完整的HTML文档结构
  const fullHtml = `<!DOCTYPE html>${html}`;
  
  fs.writeFileSync(filePath, fullHtml);
  console.log(`Generated: ${filePath}`);
});

console.log('All game pages generated successfully!'); 