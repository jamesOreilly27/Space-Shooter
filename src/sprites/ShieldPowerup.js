import { Powerup } from '../sprites'

export default class ShieldPowerup extends Powerup {
  constructor(config) {
    super(config)
  }

  handleCollision() {
    const player = this.scene.player
    if(player.shieldLevel < 3) player.shieldLevel++
    this.scene.shields.children.entries.forEach(shield => { shield.destroy() })
  }
}
