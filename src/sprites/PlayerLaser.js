import { Laser } from '../sprites'

export default class PlayerLaser extends Laser {
  constructor(config) {
    super(config)
    let laserLevel = config.scene.player.laserLevel
    if(laserLevel === 2) {
      this.scaleX = .8
      this.scaleY = .8
    } else if(laserLevel === 3) {
      this.scaleX = 1
      this.scaleY = 1
    }
  }

  update() {
    super.update()
    if(this.active && !this.body.velocity.y) this.body.setVelocityY(-600)
  }
}
