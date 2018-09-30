import Phaser, { Scene } from 'phaser'
import { Player, Enemy } from '../Sprites'
import { destroy, randomCoordinateX, randomCoordinateY } from './utils'

export default class Battlefield extends Scene {
  constructor() {
    super({ key: 'Battlefield', active: true })
    this.updateCount = 0
    this.player = {}
    this.enemies = {}
    this.testEnemy = {}
    this.lasers = {}
    this.cursors = {}
  }

  addCollider(group1, group2, callback) {
    this.physics.add.collider(group1, group2, callback, null, this)
  }

  addEnemy() {
    new Enemy(this.enemies.create(randomCoordinateX(), randomCoordinateY(), 'enemy'))
  }

  preload() {
    this.load.image('player', './assets/playerShip1_green.png')
    this.load.image('player-laser', './assets/laserGreen03.png')
    this.load.image('enemy-laser', './assets/laserRed10.png')
    this.load.image('enemy', './assets/enemyRed1.png')
    this.lasers = this.physics.add.group()
    this.enemies = this.physics.add.group()
  }

  create() {
    //Filling in Battlefield Properties
    this.player = new Player({ scene: this, key: 'player', x: 100, y: 450 })
    this.cursors = this.input.keyboard.createCursorKeys()
    this.testEnemy = new Enemy({ scene: this, key: 'enemy', x: 700, y: 100 })
    this.enemies.add(this.testEnemy)

    //Colliders
    this.addCollider(this.enemies, this.lasers, destroy)
    this.addCollider(this.player, this.enemies, destroy)
    this.addCollider(this.player, this.lasers, destroy)
    console.log(this.enemies)
  }

  update() {
    this.updateCount++
    this.player.move(this.cursors)
    this.player.shoot(this, 'player-laser')
    this.testEnemy.move(this.updateCount)
    this.testEnemy.shoot(this, 'enemy-laser')
    if(this.updateCount >= 200) this.updateCount = 0
    if(!this.updateCount % 100 && this.enemies.children.entries.length < 6) {
      // this.addEnemy()
    }
  }
}
