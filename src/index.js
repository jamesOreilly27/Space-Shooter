import Phaser, { Game } from 'phaser'
import { Background, Battlefield, Title, Death } from './scenes'

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
  scene: [ Background, Title, Battlefield, Death]
}

new Game(gameConfig)
