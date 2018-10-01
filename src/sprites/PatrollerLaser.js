import { Laser } from '../sprites'

export default class PatrollerLaser extends Laser {
  constructor(config) {
    super(config)
  }

  update() {
    super.update()
    if(this.active && !this.body.velocity.y) {
      this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, 400)
    }
  }
}
