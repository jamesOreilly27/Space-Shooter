import Phaser, { GameObjects } from 'phaser'

export default class Player {
  constructor(sprite) {
    this.sprite = sprite
    this.laser = {}
  }

  move(cursors) {
    const sprite = this.sprite

    if(this.sprite.active) {
      if(cursors.left.isDown) sprite.setVelocityX(-250)
      else if(cursors.right.isDown) sprite.setVelocityX(250)
      else sprite.setVelocityX(0)
  
      if(cursors.down.isDown) sprite.setVelocityY(250)
      else if(cursors.up.isDown) sprite.setVelocityY(-250)
      else sprite.setVelocityY(0)
    }
  }

  shoot(scene, spriteString) {
    const spacebar = scene.cursors.space
    const laserRechargeCount = scene.updateCount
    if(
      spacebar.isDown &&
      ((laserRechargeCount % 20 === 0) || scene.time.now - spacebar.timeDown < 10)
    ) {
      this.laser = scene.lasers.create(this.sprite.x, this.sprite.y - 60, spriteString)
      this.laser.setVelocityY(-750)
    }
  }
}
