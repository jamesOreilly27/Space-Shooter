import { Laser } from '../sprites'

export default class DivebomberLaser extends Laser {
  constructor(config) {
    super(config)
    this.bulletSpeed = config.bulletSpeed
  }

  move() {
    if(this.active) {
      if(this.x <= 400) this.body.setVelocityX(50)
      else this.body.setVelocityX(-50)
      this.body.setVelocityY(this.bulletSpeed)
    }
  }

  update() {
    super.update()
    this.move()
  }
}
