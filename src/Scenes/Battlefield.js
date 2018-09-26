import Phaser, { Scene } from 'phaser'
import { Player } from '../Sprites'

let player1

export default class Battlefield extends Scene {
  constructor() {
    super({ key: 'Battlefield', active: true })
  }

  preload() {
    this.load.image('player', './assets/playerShip1_green.png')
  }

  create() {
    const player = new Player(this.physics.add.sprite(100, 450, 'player'))
    console.log(player)
    player.sprite.setCollideWorldBounds(true)
  }
}
