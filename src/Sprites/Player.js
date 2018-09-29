import Phaser from 'phaser'

export default class PlayerTest extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key)
    config.scene.physics.world.enable(this)
    config.scene.add.existing(this)
    this.body.setCollideWorldBounds(true)
  }
  move(cursors) {
    if(this.active) {
      if(cursors.left.isDown) this.body.setVelocityX(-250)
      else if(cursors.right.isDown) this.body.setVelocityX(250)
      else this.body.setVelocityX(0)
  
      if(cursors.down.isDown) this.body.setVelocityY(250)
      else if(cursors.up.isDown) this.body.setVelocityY(-250)
      else this.body.setVelocityY(0)
    }
  }

  shoot(scene, spriteString) {
    const spacebar = scene.cursors.space
    const laserRechargeCount = scene.updateCount
    if(
      spacebar.isDown &&
      ((laserRechargeCount % 20 === 0) || scene.time.now - spacebar.timeDown < 10)
    ) {
      this.laser = scene.lasers.create(this.body.x, this.body.y - 60, spriteString)
      this.laser.setVelocityY(-750)
    }
  }
}
