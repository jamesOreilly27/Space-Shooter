import Phaser, { Scene } from 'phaser'
import { Player, Enemy } from '../Sprites'

export default class Battlefield extends Scene {
  constructor() {
    super({ key: 'Battlefield', active: true })
    this.updateCount = 0
    this.player = {}
    this.enemies = []
    this.cursors = {}
  }

  preload() {
    this.load.image('player', './assets/playerShip1_green.png')
    this.load.image('laser', './assets/laserGreen03.png')
    this.load.image('enemy', './assets/enemyRed1.png')
  }

  create() {
    //Filling in Battlefield Properties
    this.player = new Player(this.physics.add.sprite(100, 450, 'player')) 
    this.player.sprite.setCollideWorldBounds(true)
    this.cursors = this.input.keyboard.createCursorKeys()
    this.enemies.push(new Enemy(this.physics.add.sprite(500, 100, 'enemy')))
    console.log(this.enemies[0])

  }

  update() {
    this.updateCount++
    this.player.move(this.cursors)
    this.player.shoot(this, 'laser')
  }
}
