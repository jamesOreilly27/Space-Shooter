import Phaser from 'phaser'

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

  shoot(scene, spriteString) {
    // const laserRechargeCount = scene.updateCount
    // if(laserRechargeCount % 35 === 0 && this.active) {
    //   this.laser = scene.lasers.create(this.x, this.y + 60, spriteString)
    //   this.laser.scaleX = .6
    //   this.laser.scaleY = .6
    //   this.laser.setVelocityY(400)
    // }
  } 

  update() {
    this.move(this.scene.updateCount)
    this.shoot(this.scene, 'enemy-laser')
  }
}