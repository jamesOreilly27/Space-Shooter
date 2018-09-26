import Phaser, { Scene } from 'phaser'
import { Player } from '../Sprites'

export default class Battlefield extends Scene {
  constructor() {
    super({ key: 'Battlefield', active: true })
    this.player = {}
    this.cursors = {}
  }

  preload() {
    this.load.image('player', './assets/playerShip1_green.png')
  }

  create() {
    this.player = new Player(this.physics.add.sprite(100, 450, 'player')) 
    this.cursors = this.input.keyboard.createCursorKeys()

    this.player.sprite.setCollideWorldBounds(true)
  }

  update() {
    this.player.movement(this.cursors)
  }
}
