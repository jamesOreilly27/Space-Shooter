import { Laser } from '../sprites'

export default class PlayerLaser extends Laser {
  constructor(config) {
    super(config)
  }

  update() {
    if(!this.body.velocity.y) this.body.setVelocityY(-750)
  }
}