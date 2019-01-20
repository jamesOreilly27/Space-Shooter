import Phaser, { Scene } from 'phaser'
import { Player, PatrolShip, Divebomber, Chaser, ShieldPowerup, LaserPowerup, Meteor } from '../sprites'
import { destroy, randomCoordinateX, randomCoordinateY, powerup, shieldBlock, laserCollision, meteorDestroy } from './utils'

export default class Battlefield extends Scene {
  constructor() {
    super({ key: 'Battlefield', active: true })
    this.updateCount = 0
  }

  addCollider(group1, group2, callback) {
    return this.physics.add.collider(group1, group2, callback, null, this)
  }

  //Add Enemy Functions
  //All functions for adding enemies are currently for testing purposes
  //Once all enemy classes are completed I will focus on exactly how/where/when I want them to appear
  addPatrol() {
    this.enemies.add(new PatrolShip({ scene: this, key: 'patrol-ship', x: 810, y: 20 }))
    this.enemies.add(new PatrolShip({ scene: this, key: 'patrol-ship', x: 880, y: 20 }))
    this.enemies.add(new PatrolShip({ scene: this, key: 'patrol-ship', x: 950, y: 20 }))
  }

  addDivebombers(count) {
    const randomStart = randomCoordinateX()
    const coordinates = [
      { x: 0, y: -20 },
      { x: 50, y: -80 },
      { x: 100, y: -140 }
    ]
    for(let i = 0; i < count; i++) {
      this.enemies.add(new Divebomber({ scene: this, key: 'divebomber', x: (randomStart + coordinates[i].x), y: coordinates[i].y }))
    }
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
    this.load.image('player-laser2', './assets/LaserGreen10.png')

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
    this.load.image('shield1', './assets/shield1.png')
    this.load.image('shield2', './assets/shield2.png')
    this.load.image('shield3', './assets/shield3.png')

    // *************** laser power up ***************
    this.load.image('gun-upgrade', './assets/gun10.png')

    // *************** Meteors **********************
    this.load.image('big-meteor', './assets/meteorBrown_big1.png')
    this.load.image('med-meteor', './assets/meteorBrown_med3.png')
    this.load.image('meteor-piece', './assets/meteorBrown_tiny1.png')
    this.load.image('sm-meteor', './assets/meteorBrown_small1.png')

    // ************** Wreckage *******************
    this.load.image('fire', './assets/fire00.png')
    this.load.image('fire2', './assets/fire10.png')

    this.playerLasers = this.physics.add.group()
    this.enemyLasers = this.physics.add.group()
    this.enemies = this.physics.add.group()
    this.powerups = this.physics.add.group()
    this.shields = this.physics.add.group()
    this.meteors = this.physics.add.group()
    this.wreckage = this.physics.add.group()
  }

  create() {
    //Filling in Battlefield Properties
    this.player = new Player({ scene: this, key: 'player', x: 100, y: 450 })
    this.cursors = this.input.keyboard.createCursorKeys()
    this.laserCollide = this.addCollider(this.playerLasers, this.enemyLasers, laserCollision)
    this.laserCollide.active = false;
    this.meteors.add(new Meteor({ scene: this, x: 400, y: 300, key: 'med-meteor'}))
    // this.powerups.add(new ShieldPowerup({ scene: this, x: 400, y: 300, key: this.player.getShieldPowerupSprite() }))
    // this.powerups.add(new LaserPowerup({ scene: this, x: 200, y: 300, key: 'gun-upgrade' }))
    this.addPatrol()
    this.addDivebombers(3)
    this.addChaser()

    // ***** Colliders *****
    this.addCollider(this.enemies, this.playerLasers, destroy)
    this.addCollider(this.player, this.enemies, destroy)
    this.addCollider(this.player, this.enemyLasers, destroy)
    this.addCollider(this.player, this.powerups, powerup)
    this.addCollider(this.enemies, this.shields, shieldBlock)
    this.addCollider(this.enemyLasers, this.shields, shieldBlock)
    this.addCollider(this.player, this.powerups, powerup)
    this.addCollider(this.playerLasers, this.meteors, meteorDestroy)
  }
  
  update() {
    this.updateCount++
    this.player.update()
    this.enemies.children.entries.forEach(enemy => { enemy.update() })
    this.playerLasers.children.entries.forEach(laser => { laser.update() })
    this.enemyLasers.children.entries.forEach(laser => { laser.update() })
    this.shields.children.entries.forEach(shield => { shield.update() })
    if(this.updateCount % 75 === 0) this.addEnemies()
    // if(this.updateCount % 100 === 0) this.addDivebombers(1)
    if(this.updateCount >= 200) this.updateCount = 0
  }
}
