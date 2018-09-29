export default class Enemy {
  constructor(sprite) {
    this.sprite = sprite
    this.laser = {}
  }

  move(updateCount) {
    if(this.sprite.active) {
      if(updateCount < 50) {
        this.sprite.setVelocityX(-100)
        this.sprite.setVelocityY(30)
      }
      else if(updateCount < 100) {
        this.sprite.setVelocityX(30)
        this.sprite.setVelocityY(100)
      }
      else if(updateCount < 150) {
        this.sprite.setVelocityX(100)
        this.sprite.setVelocityY(-30)
      }
      else {
        this.sprite.setVelocityX(-30)
        this.sprite.setVelocityY(-100)
      }
    }
  }

  shoot(scene, spriteString) {
    const laserRechargeCount = scene.updateCount
    if(laserRechargeCount % 35 === 0 && this.sprite.active) {
      this.laser = scene.lasers.create(this.sprite.x, this.sprite.y + 60, spriteString)
      this.laser.scaleX = .6
      this.laser.scaleY = .6
      this.laser.setVelocityY(400)
    }
  }
}
