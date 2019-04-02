import { Laser } from '../sprites'

export default class PlayerLaser extends Laser {
  constructor(config) {
    super(config)
    let laserLevel = config.scene.player.laserLevel
    if(laserLevel === 2) {
      this.scaleX = .5
      this.scaleY = .5
    } else if(laserLevel === 3) {
      this.scaleX = .7
      this.scaleY = .7
    }
  }

  update() {
    super.update()
    if(this.active && !this.body.velocity.y) this.body.setVelocityY(-600)
  }
}
