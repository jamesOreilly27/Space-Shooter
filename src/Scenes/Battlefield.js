import Phaser, { Scene } from 'phaser'
import { Player } from '../sprites'
import { battlefieldImageLoad, incrementLevel } from './utils/battlefield'
import { enemyDestroy, playerDestroy, getPowerup, shieldBlock, laserCollision } from './utils/collisions'
import { spawnEnemies, incrementEnemySpecs, resetEnemySpecs, baseSpawnRate, resetEnemySpawnRate } from './utils/enemies'

export default class Battlefield extends Scene {
  constructor() {
    super({ key: 'Battlefield' })
    this.enemySpawnRate = baseSpawnRate
    this.nextEnemySpawn = 0
    this.scoreText = ''
  }

  addCollider(group1, group2, callback) {
    return this.physics.add.collider(group1, group2, callback, null, this)
  }

  addOverlap(group1, group2, callback) {
    return this.physics.add.overlap(group1, group2, callback, null, this)
  }

  preload() {
    /***** Preload all images *****/
    battlefieldImageLoad(this)
    this.load.spritesheet('explosion', './assets/explosion.png', { frameWidth: 32, frameHeight: 48, endFrame: 5 })
    this.load.multiatlas('bomb-aftermath', '/assets/bomb-explosion.json', 'assets')

    /***** Add the needed Physics Groups *****/
    this.playerLasers = this.physics.add.group()
    this.enemyLasers = this.physics.add.group()
    this.enemies = this.physics.add.group()
    this.powerups = this.physics.add.group()
    this.shields = this.physics.add.group()
  }

  create() {
    resetEnemySpecs()
    resetEnemySpawnRate(this)
    //Filling in Battlefield Properties
    this.score = this.scene.settings.data.score
    this.level = this.scene.settings.data.level
    this.scoreText = this.add.text(16, 16, `SCORE: ${this.score}`, { fontSize: '32px', fontFamily: 'Space Mono', fill: '#FFF' })
    this.levelText = this.add.text(16, 50, `LEVEL: ${this.level}`, { fontSize: '32px', fontFamily: 'Space Mono', fill: '#FFF' })
    this.cursors = this.input.keyboard.createCursorKeys()
    this.player = new Player({ scene: this, key: 'player', x: 100, y: 450 })
    
    /***** Colliders  & Overlaps *****/
    this.addOverlap(this.playerLasers, this.enemyLasers, laserCollision)
    this.addOverlap(this.enemies, this.playerLasers, enemyDestroy)
    this.addCollider(this.player, this.enemies, playerDestroy)
    this.addCollider(this.player, this.enemyLasers, playerDestroy)
    this.addCollider(this.player, this.powerups, getPowerup)
    this.addCollider(this.enemies, this.shields, shieldBlock)
    this.addCollider(this.enemyLasers, this.shields, shieldBlock)
    
    /***** Animations *****/
    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 5, first: 5 }),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    })

    this.anims.create({
      key: 'bomb-explode',
      frames: this.anims.generateFrameNames('bomb-aftermath',
      {
        start: 1,
        end: 10,
        zeroPad: 2,
        prefix: 'explosion',
        suffix: '.png'
      }),
      frameRate: 25,
      repeat: 0,
      hideOnComplete: true
    })
  }
  
  update(time, delta) {
    let currentLevel = this.level
    this.player.update(time, delta)
    this.enemies.children.entries.forEach(enemy => { enemy.update(time, delta) })
    this.playerLasers.children.entries.forEach(laser => { laser.update(time, delta) })
    this.enemyLasers.children.entries.forEach(laser => { laser.update(time, delta) })
    this.shields.children.entries.forEach(shield => { shield.update(time, delta) })
    incrementLevel(this)
    if(this.level !== currentLevel) {
      this.player.speed *= 1.045
      incrementEnemySpecs()
      this.enemies.children.entries.forEach(enemy => { enemy.levelUp(this) })
    }
    spawnEnemies(this, time, delta)
  }
}
