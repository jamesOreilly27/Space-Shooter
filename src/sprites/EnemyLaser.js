import { Laser } from '../sprites'

export default class EnemyLaser extends Laser {
  constructor(config) {
    super(config)
    this.scaleX = .6
    this.scaleY = .6
  }

  update() {
    super.update()
    if(this.active && !this.body.velocity.y) this.body.setVelocityY(400)
  }
}
