import { Laser } from '../sprites'

export default class FighterLaser extends Laser {
  constructor(config) {
    super(config)
  }

  move() {
    if(this.active) {
      this.body.setVelocityY(450)

    }
  }

  update() {
    this.move()
  }
}