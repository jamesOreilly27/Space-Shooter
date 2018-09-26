import Phaser, { Scene } from 'phaser'

let player

export default class Battlefield extends Scene {
  constructor() {
    super({ key: 'Battlefield', active: true })
  }

  preload() {
    this.load.image('player', './assets/playerShip1_green.png')
  }

  create() {
    player = this.physics.add.sprite(100, 450, 'player')
    player.setCollideWorldBounds(true)
  }
}
