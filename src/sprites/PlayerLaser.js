import { Laser } from '../sprites'

export default class PlayerLaser extends Laser {
  constructor(config) {
    super(config)
  }

  update() {
    super.update()
    if(this.active && !this.body.velocity.y) this.body.setVelocityY(-600)
  }
}