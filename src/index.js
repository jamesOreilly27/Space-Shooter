import Phaser, { Game } from 'phaser'
import { Background, Battlefield } from './scenes'

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
  scene: [ Background, Battlefield ]
}

new Game(gameConfig)
