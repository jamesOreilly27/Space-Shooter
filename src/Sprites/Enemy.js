import Phaser from 'phaser'
import { EnemyLaser } from '../sprites'

export default class Enemy extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key)
    this.scene = config.scene
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
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
    if(laserRechargeCount % 35 === 0 && this.active) {
      this.scene.lasers.add(new EnemyLaser({ scene: this.scene, x: this.x, y: this.y + 80, key: spriteString }))
    }
  } 

  update() {
    this.move(this.scene.updateCount)
    this.shoot('enemy-laser')
  }
}
