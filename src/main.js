import { Configs } from '../config.js';
import { Game } from './controllers/game.class.js';
import { Colors } from './ui/colors.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth
canvas.height = window.innerHeight;

const game = new Game(canvas);
game.nextLevel();
game.play();
game.start();