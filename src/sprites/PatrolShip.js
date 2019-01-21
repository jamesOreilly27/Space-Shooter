import Phaser from 'phaser'
import { Ship, PatrolShipLaser } from '../sprites'

export default class PatrolShip extends Ship {
  constructor(config) {
    super(config)
    this.movestarted = false
  }

  move() {
    if(this.active) {
      while(!this.started) {
        this.body.setVelocityX(80)
        this.started = true
      }
      if(this.x > 800) this.body.setVelocityX(-80)
      else if(this.x < 10) this.body.setVelocityX(80)
    }
  }

  shoot(spriteStr) {
    const laserRechargeCount = this.scene.updateCount
    if(laserRechargeCount % 100 === 0 && this.active) {
      this.scene.enemyLasers.add(new PatrolShipLaser({ scene: this.scene, x: this.x, y: this.y + 40, key: spriteStr }))
    }
  } 

  update() {
    this.move(this.scene.updateCount)
    this.shoot('patrol-ship-laser')
  }
}
