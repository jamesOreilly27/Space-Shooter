import Phaser from 'phaser'
import { ShieldPowerup } from '../sprites'
import { genRandNum } from '../scenes/utils/enemies.js'

export default class Ship extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key, config.path)
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
    this.key = config.key
    this.scaleX = .4
    this.scaleY = .4
    this.speed = 0
    this.bulletSpeed = 0
    this.fireRate = 0
  }

  setFireRate(newRate) {
    this.fireRate = newRate
  }

  setSpeed(newSpeed) {
    this.speed = newSpeed
  }

  setBulletSpeed(newSpeed) {
    this.bulletSpeed = newSpeed
  }

  noPowerupOnScreen() { return this.scene.powerups.children.entries.length === 0 }

  checkDrop(number, shieldLevel) {
    return number <= 500 &&
    shieldLevel < 3 &&
    this.noPowerupOnScreen() &&
    (this.key === 'divebomber' || this.key === 'fighter')
  }

  dropPowerup() {
    const randNum = genRandNum(1000)
    const shieldLevel = this.scene.player.shieldLevel
    let shieldKey = ''
    if(shieldLevel === 0) shieldKey ='bronze-shield'
    if(shieldLevel === 1) shieldKey = 'silver-shield'
    if(shieldLevel === 2) shieldKey = 'gold-shield'
    if(this.checkDrop(randNum, shieldLevel)) {
      this.scene.powerups.add(new ShieldPowerup({scene: this.scene, x: this.x, y: this.y, key: shieldKey }))
    }
  }

  explode() {
    const explosion = this.scene.physics.add.sprite(this.x, this.y, 'explosion')
    explosion.play('explode')
    this.dropPowerup()
    this.destroy()
  }

  playerExplode() {
    for(let arrowKey in this.scene.cursors) {
      this.scene.cursors[arrowKey].reset()
    }
    this.scene.scene.start('Death', { score: this.scene.score })
  }

  updateScore() {
    if(this.key === 'divebomber') this.scene.score += 50
    if(this.key === 'fighter') this.scene.score += 50
    if(this.key === 'chaser') this.scene.score += 3
    if(this.key === 'patrol-ship') this.scene.score += 50
    this.scene.scoreText.setText(`SCORE: ${this.scene.score}`)
  }

  enemyExplode() {
    this.updateScore()
    this.explode()
  }
}
