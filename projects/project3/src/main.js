import { Boot } from './scenes/Boot.js';
import { Game } from './scenes/Game.js';
import { GameOver } from './scenes/GameOver.js';
import { Preloader } from './scenes/Preloader.js';
import { QTE } from './scenes/QTE.js';
import { Instructions } from './scenes/Instructions.js';
import { BaitMenu } from './scenes/BaitMenu.js';
import { Fishing } from './scenes/Fishing.js';
import { FishBag } from './scenes/FishBag.js';

const config = {
      type: Phaser.AUTO,
  width: 360,   // keep your existing game size
  height: 240,  // (whatever you currently use)
  parent: 'game-container',
  backgroundColor: '#000000',
  pixelArt: true,        // important for sharp pixels
  scale: {
    mode: Phaser.Scale.FIT,          // fit inside browser window
    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom: 4,  
  },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        Instructions,
        Game,
        GameOver,
        QTE,
        BaitMenu,
        Fishing,
        FishBag,
    ]
};

new Phaser.Game(config);
