import Phaser, { Scene } from 'phaser'
import { Player } from '../Sprites'

let player

export default class Battlefield extends Scene {
  constructor() {
    super({ key: 'Battlefield', active: true })
  }

  preload() {
    this.load.image('player', './assets/playerShip1_green.png')
  }

  create() {
    player = new Player(this.physics.add.sprite(100, 450, 'player'), this.input.keyboard.createCursorKeys())
    player.sprite.setCollideWorldBounds(true)
  }

  update() {
    player.movement()
  }
}
