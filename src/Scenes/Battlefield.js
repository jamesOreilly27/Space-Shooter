import Phaser, { Scene } from 'phaser'
import { Player } from '../Sprites'

export default class Battlefield extends Scene {
  constructor() {
    super({ key: 'Battlefield', active: true })
    this.updateCount = 0
    this.player = {}
    this.cursors = {}
  }

  preload() {
    this.load.image('player', './assets/playerShip1_green.png')
    this.load.image('laser', './assets/laserGreen03.png')
  }

  create() {
    //Filling in Battlefield Properties
    this.player = new Player(this.physics.add.sprite(100, 450, 'player')) 
    this.cursors = this.input.keyboard.createCursorKeys()

    this.player.sprite.setCollideWorldBounds(true)

    console.log(this.player)
  }

  update() {
    this.updateCount++
    this.player.move(this.cursors)
    this.player.shoot(this, 'laser')
  }
}
