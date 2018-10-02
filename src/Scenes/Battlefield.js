import Phaser, { Scene } from 'phaser'
import { Player, PatrolShip } from '../sprites'
import { destroy, randomCoordinateX, randomCoordinateY } from './utils'

export default class Battlefield extends Scene {
  constructor() {
    super({ key: 'Battlefield', active: true })
    this.updateCount = 0
  }

  addCollider(group1, group2, callback) {
    this.physics.add.collider(group1, group2, callback, null, this)
  }

  addPatrol() {
    this.enemies.add(new PatrolShip({ scene: this, key: 'patrol-ship', x: 810, y: 20 }))
  }

  preload() {
    this.load.image('player', './assets/playerShip1_green.png')
    this.load.image('player-laser', './assets/laserGreen03.png')
    this.load.image('patrol-ship-laser', './assets/laserRed10.png')
    this.load.image('patrol-ship', './assets/enemyRed1.png')
    this.playerLasers = this.physics.add.group()
    this.enemyLasers = this.physics.add.group()
    this.enemies = this.physics.add.group()
  }

  create() {
    //Filling in Battlefield Properties
    this.player = new Player({ scene: this, key: 'player', x: 100, y: 450 })
    this.cursors = this.input.keyboard.createCursorKeys()
    this.addEnemy()

    //Colliders
    this.addCollider(this.enemies, this.playerLasers, destroy)
    this.addCollider(this.player, this.enemies, destroy)
    this.addCollider(this.player, this.enemyLasers, destroy)
  }

  update() {
    this.updateCount++
    this.player.update()
    this.enemies.children.entries.forEach(enemy => { enemy.update() })
    this.playerLasers.children.entries.forEach(laser => { laser.update() })
    this.enemyLasers.children.entries.forEach(laser => { laser.update() })
    if(this.updateCount >= 200) this.updateCount = 0
  }
}
