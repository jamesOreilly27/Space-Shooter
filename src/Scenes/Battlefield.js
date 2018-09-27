import Phaser, { Scene } from 'phaser'
import { Player, Enemy } from '../Sprites'
import { destroy } from './utils'

export default class Battlefield extends Scene {
  constructor() {
    super({ key: 'Battlefield', active: true })
    this.updateCount = 0
    this.player = {}
    this.enemies = {}
    this.lasers = {}
    this.cursors = {}
  }

  preload() {
    this.load.image('player', './assets/playerShip1_green.png')
    this.load.image('laser', './assets/laserGreen03.png')
    this.load.image('enemy', './assets/enemyRed1.png')
    this.lasers = this.physics.add.group()
    this.enemies = this.physics.add.group()
  }

  create() {
    //Filling in Battlefield Properties
    this.player = new Player(this.physics.add.sprite(100, 450, 'player')) 
    this.player.sprite.setCollideWorldBounds(true)
    this.cursors = this.input.keyboard.createCursorKeys()
    const testEnemy = new Enemy(this.enemies.create(500, 100, 'enemy'))

    //Colliders
    this.physics.add.collider(this.enemies, this.lasers, destroy, null, this)
    this.physics.add.collider(this.player.sprite, this.enemies, destroy, null, this)
    console.log(this.physics.world)
  }

  update() {
    this.updateCount++
    this.player.move(this.cursors)
    this.player.shoot(this, 'laser')
  }
}
