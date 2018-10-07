import { Powerup } from '../sprites'

export default class LaserPowerup extends Powerup {
  constructor(config) {
    super(config)

  }

  handleCollision() {
    if(this.scene.player.laserLevel < 3) this.scene.player.laserLevel++
  }
}
