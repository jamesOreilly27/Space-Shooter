import Phaser from 'phaser'
import { Ship, PatrolShipLaser } from '../sprites'

export default class PatrolShip extends Ship {
  constructor(config) {
    super(config)
  }

  move() {
    if(this.active) {
      if(this.x > 800) this.body.setVelocityX(-80)
      else if(this.x < 10) this.body.setVelocityX(80)
    }
  }

  shoot(spriteString) {
    const laserRechargeCount = this.scene.updateCount
    if(laserRechargeCount % 100 === 0 && this.active) {
      this.scene.enemyLasers.add(new PatrolShipLaser({ scene: this.scene, x: this.x, y: this.y + 40, key: spriteString }))
    }
  }

  // explode() {
  //   const explosion = this.scene.physics.add.sprite(this.x, this.y, 'explosion')
  //   explosion.play('explode')
  //   this.destroy()
  // }

  update() {
    this.move(this.scene.updateCount)
    this.shoot('patrol-ship-laser')
  }
}
