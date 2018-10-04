import { Powerup } from '../sprites'

export default class ShieldPowerup extends Powerup {
  constructor(config) {
    super(config)
  }

  handleCollision() {
    this.scene.player.shieldLevel++
  }
}
