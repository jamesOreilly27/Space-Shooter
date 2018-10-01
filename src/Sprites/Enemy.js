import Phaser from 'phaser'
import { Ship, PatrollerLaser } from '../sprites'

export default class Enemy extends Ship {
  constructor(config) {
    super(config)
  }

  move(updateCount) {
    if(this.active) {
      if(updateCount < 50) {
        this.body.setVelocityX(-100)
        this.body.setVelocityY(30)
      }
      else if(updateCount < 100) {
        this.body.setVelocityX(30)
        this.body.setVelocityY(100)
      }
      else if(updateCount < 150) {
        this.body.setVelocityX(100)
        this.body.setVelocityY(-30)
      }
      else {
        this.body.setVelocityX(-30)
        this.body.setVelocityY(-100)
      }
    }
  }

  shoot(spriteString) {
    const laserRechargeCount = this.scene.updateCount
    if(laserRechargeCount % 60 === 0 && this.active) {
      this.scene.lasers.add(new PatrollerLaser({ scene: this.scene, x: this.x, y: this.y + 80, key: spriteString }))
    }
  } 

  update() {
    this.move(this.scene.updateCount)
    this.shoot('patroller-laser')
  }
}
