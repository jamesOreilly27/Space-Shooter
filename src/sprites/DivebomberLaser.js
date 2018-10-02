import { Laser } from '../sprites'

export default class DivebomberLaser extends Laser {
  constructor(config) {
    super(config)
  }

  move() {
    if(this.active) {
      if(this.x <= 400) this.body.setVelocityX(50)
      else this.body.setVelocityX(-50)
      this.body.setVelocityY(400)
    }
  }

  update() {
    super.update()
    this.move()
  }
}
