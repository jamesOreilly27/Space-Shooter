import Phaser from 'phaser'
import { Ship, PlayerLaser, Shield } from '../sprites'

export default class Player extends Ship {
  constructor(config) {
    super(config)
    this.shieldLevel = 0
    this.laserLevel = 1
    this.body.setCollideWorldBounds(true)
  }

  getShieldPowerupSprite() {
    if(this.shieldLevel === 0) return 'bronze-shield'
    else if(this.shieldLevel === 1) return 'silver-shield'
    else return 'gold-shield'
  }

  getShieldSprite() {
    if(this.shieldLevel === 1) return 'shield1'
    else if(this.shieldLevel === 2) return 'shield2'
    else if(this.shieldLevel === 3) return 'shield3'
  }

  getLaserSprite() {
    if(this.laserLevel === 1) return 'player-laser'
    else if(this.laserLevel === 2 || this.laserLevel === 3) return 'player-laser2'
  }

  createShield(shieldStr) {
    this.scene.shields.add(new Shield({ scene: this.scene, x: this.x, y: this.y, key: shieldStr }))
  }

  move() {
    if(this.scene.cursors.left.isDown) this.body.setVelocityX(-250)
    else if(this.scene.cursors.right.isDown) this.body.setVelocityX(250)
    else this.body.setVelocityX(0)
  
    if(this.scene.cursors.down.isDown) this.body.setVelocityY(250)
    else if(this.scene.cursors.up.isDown) this.body.setVelocityY(-250)
    else this.body.setVelocityY(0)
  }

  shoot() {
    const spacebar = this.scene.cursors.space
    const laserRechargeCount = this.scene.updateCount
    if(spacebar.isDown && 
      ((laserRechargeCount % 20 === 0) || this.scene.time.now - spacebar.timeDown < 20)) {
        this.scene.playerLasers.add(new PlayerLaser({ scene: this.scene, x: this.x, y: this.y -40, key: this.getLaserSprite() }))
    }
  }

  updateShield() {
    this.createShield(this.getShieldSprite())
  }

  update() {
    if(this.active) {
      this.move() 
      this.shoot()
      if(this.scene.shields.children.entries.length === 0) {
        this.updateShield()
      }
    }
  }
}
