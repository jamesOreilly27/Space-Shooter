import Phaser, { Scene } from 'phaser'
import { Player, Enemy } from '../Sprites'
import { destroy, randomCoordinateX, randomCoordinateY } from './utils'

export default class Battlefield extends Scene {
  constructor() {
    super({ key: 'Battlefield', active: true })
    this.updateCount = 0
  }

  addCollider(group1, group2, callback) {
    this.physics.add.collider(group1, group2, callback, null, this)
  }

  addEnemy() {
    this.enemies.add(new Enemy({ scene: this, key: 'enemy', x: randomCoordinateX(), y: randomCoordinateY() }))
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
    this.enemies.add(new Enemy({ scene: this, key: 'enemy', x: 700, y: 100 }))

    //Colliders
    this.addCollider(this.enemies, this.lasers, destroy)
    this.addCollider(this.player, this.enemies, destroy)
    this.addCollider(this.player, this.lasers, destroy)
  }

  update() {
    this.updateCount++
    this.player.update()
    this.enemies.children.entries.forEach(enemy => {
      enemy.update()
    })
    if(this.updateCount >= 200) this.updateCount = 0
    if(!this.updateCount % 100 && this.enemies.children.entries.length < 6) this.addEnemy()
  }
}
