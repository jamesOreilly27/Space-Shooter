import { Laser } from '../sprites'

export default class DivebomberLaser extends Laser {
  constructor(config) {
    super(config)
    this.bulletSpeed = config.bulletSpeed
    this.left = config.left
  }

  move() {
    if(this.active) {
      if(this.left) this.body.setVelocityX(50)
      else this.body.setVelocityX(-50)
      this.body.setVelocityY(this.bulletSpeed)
    }
  }

  update() {
    super.update()
    this.move()
  }
}
