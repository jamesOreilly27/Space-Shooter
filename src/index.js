import Phaser, { Game } from 'phaser'
import { Background } from './Scenes'

const gameConfig = {
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [ Background ]
}

new Game(gameConfig)