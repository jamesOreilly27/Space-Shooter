import Phaser, { Scene } from 'phaser'
import { Player, ShieldPowerup, LaserPowerup, Meteor } from '../sprites'
import { enemyDestroy, destroy, powerup, shieldBlock, laserCollision, meteorDestroy, battlefieldImageLoad, spawnMeteors } from './utils'
import { addPatrol, addDivebombers, addChaser, addFighter, addRandomEnemy, spawnEnemies } from './utils/enemies'

export default class Battlefield extends Scene {
  constructor() {
    super({ key: 'Battlefield', active: true })
    this.enemySpawnRate = 5000
    this.meteorSpawnRate = 75
    this.nextMeteor = 0
    this.nextEnemySpawn = 0
    this.updateCount = 0
    this.level = 1
    this.score = 0
    this.scoreText = ''
  }

  addCollider(group1, group2, callback) {
    return this.physics.add.collider(group1, group2, callback, null, this)
  }

  levelUp() {
    if(this.score >= 50) this.level = 2
    if(this.score >= 51 && this.score <= 500) this.level = 3
    if(this.score >= 501 && this.score <= 1000) this.level = 4
  }

  preload() {
    /***** Preload all images *****/
    battlefieldImageLoad(this)
    this.load.spritesheet('explosion', './assets/explosion.png', { frameWidth: 32, frameHeight: 48, endFrame: 5 })

    /***** Add the needed Physics Groups *****/
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
    this.scoreText = this.add.text(16, 16, `score: ${this.score}`, { fontSize: '32px', fill: '#FFF'})
    console.log(this)
    this.player = new Player({ scene: this, key: 'player', x: 100, y: 450 })
    this.cursors = this.input.keyboard.createCursorKeys()
    this.laserCollide = this.addCollider(this.playerLasers, this.enemyLasers, laserCollision)
    this.laserCollide.active = false

    // ***** Colliders *****
    this.addCollider(this.enemies, this.playerLasers, enemyDestroy)
    this.addCollider(this.player, this.enemies, enemyDestroy)
    this.addCollider(this.player, this.enemyLasers, enemyDestroy)
    this.addCollider(this.player, this.powerups, powerup)
    this.addCollider(this.enemies, this.shields, shieldBlock)
    this.addCollider(this.enemyLasers, this.shields, shieldBlock)
    this.addCollider(this.player, this.powerups, powerup)
    this.addCollider(this.playerLasers, this.meteors, meteorDestroy)

    /***** Animations *****/
    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 5, first: 5 }),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    })
  }
  
  update(time, delta) {
    let currentLevel = this.level
    this.updateCount++
    this.player.update(time, delta)
    this.enemies.children.entries.forEach(enemy => { enemy.update(time, delta) })
    this.playerLasers.children.entries.forEach(laser => { laser.update(time, delta) })
    this.enemyLasers.children.entries.forEach(laser => { laser.update(time, delta) })
    this.shields.children.entries.forEach(shield => { shield.update(time, delta) })
    this.levelUp()
    if(this.level !== currentLevel) {
      console.log('HELLO', this.level)
      this.enemies.children.entries.forEach(enemy => { enemy.levelUp(this) })
    }
    spawnEnemies(this, time, delta)
    spawnMeteors(this)
    if(this.updateCount >= 200) this.updateCount = 0
  }
}
