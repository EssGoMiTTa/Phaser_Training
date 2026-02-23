import { Menu } from './menu.js';
import { Hud } from './hud.js';
import { Game } from './game.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Menu, Game, Hud],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

new Phaser.Game(config);