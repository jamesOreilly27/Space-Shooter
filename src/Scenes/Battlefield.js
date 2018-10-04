import Phaser, { Scene } from 'phaser'
import { Player, PatrolShip, Divebomber, Chaser, ShieldPowerup } from '../sprites'
import { destroy, randomCoordinateX, randomCoordinateY, powerup } from './utils'

export default class Battlefield extends Scene {
  constructor() {
    super({ key: 'Battlefield', active: true })
    this.updateCount = 0
  }

  addCollider(group1, group2, callback) {
    this.physics.add.collider(group1, group2, callback, null, this)
  }

  //Add Enemy Functions
  //All functions for adding enemies are currently for testing purposes
  //Once all enemy classes are completed I will focus on exactly how/where/when I want them to appear
  addPatrol() {
    this.enemies.add(new PatrolShip({ scene: this, key: 'patrol-ship', x: 810, y: 20 }))
    this.enemies.add(new PatrolShip({ scene: this, key: 'patrol-ship', x: 880, y: 20 }))
    this.enemies.add(new PatrolShip({ scene: this, key: 'patrol-ship', x: 950, y: 20 }))
  }

  //I like the stepx and stepy in the setup below
  //TODO create a function that builds waves of divebombers in this sequence
  addDivebombers() {
    const randomStart = randomCoordinateX()
    this.enemies.add(new Divebomber({ scene: this, key: 'divebomber', x: randomStart, y: -20}))
    this.enemies.add(new Divebomber({ scene: this, key: 'divebomber', x: randomStart + 50, y: -80}))
    this.enemies.add(new Divebomber({ scene: this, key: 'divebomber', x: randomStart + 100, y: -140}))
  }

  addChaser() {
    this.enemies.add(new Chaser({ scene: this, key: 'chaser', x: this.player.x, y: 600 }))
  }

  addEnemies() {
    const randomNum = Math.floor(Math.random() * 3)
    if(randomNum === 0) this.addPatrol()
    else if(randomNum === 1) this.addDivebombers()
    else this.addChaser()
  }

  preload() {
    // *************** player ***************
    this.load.image('player', './assets/playerShip1_green.png')
    this.load.image('player-laser', './assets/laserGreen03.png')

    // *************** patrol ship ***************
    this.load.image('patrol-ship-laser', './assets/laserRed10.png')
    this.load.image('patrol-ship', './assets/enemyRed1.png')

    // *************** divebomber ***************
    this.load.image('divebomber', './assets/enemyRed4.png')
    this.load.image('divebomber-laser', './assets/laserRed14.png')

    // *************** chaser ***************
    this.load.image('chaser', './assets/enemyBlack2.png')

    // *************** shield power up ***************
    this.load.image('bronze-shield', './assets/shield_bronze.png')
    this.load.image('silver-shield', './assets/shield_silver.png')
    this.load.image('gold-shield', './assets/shield_gold.png')

    this.playerLasers = this.physics.add.group()
    this.enemyLasers = this.physics.add.group()
    this.enemies = this.physics.add.group()
    this.powerups = this.physics.add.group()
  }

  create() {
    //Filling in Battlefield Properties
    this.player = new Player({ scene: this, key: 'player', x: 100, y: 450 })
    this.cursors = this.input.keyboard.createCursorKeys()
    this.powerups.add(new ShieldPowerup({ scene: this, x: 400, y: 300, key: this.player.getShieldPowerupSprite() }))
    // this.addPatrol()
    // this.addDivebombers()
    // this.addChaser()

    // ***** Colliders *****
    this.addCollider(this.enemies, this.playerLasers, destroy)
    this.addCollider(this.player, this.enemies, destroy)
    this.addCollider(this.player, this.enemyLasers, destroy)
    this.addCollider(this.player, this.powerups, powerup)
  }
  
  update() {
    this.updateCount++
    this.player.update()
    this.enemies.children.entries.forEach(enemy => { enemy.update() })
    this.playerLasers.children.entries.forEach(laser => { laser.update() })
    this.enemyLasers.children.entries.forEach(laser => { laser.update() })
    // if(this.updateCount % 199 === 0) this.addEnemies()
    if(this.updateCount % 199 === 0) this.powerups.add(new ShieldPowerup({ scene: this, x: 400, y: 300, key: this.player.getShieldPowerupSprite() }))
    if(this.updateCount >= 200) this.updateCount = 0
  }
}
