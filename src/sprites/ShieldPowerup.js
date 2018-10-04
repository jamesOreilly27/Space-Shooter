import { Powerup, Shield } from '../sprites'

export default class ShieldPowerup extends Powerup {
  constructor(config) {
    super(config)
  }

  handleCollision() {
    const player = this.scene.player
    if(player.shieldLevel < 3) player.shieldLevel++
    this.scene.shields.children.entries.forEach(shield => { shield.destroy() })
    this.scene.shields.add(new Shield({scene: this.scene, x: player.x, y: player.y, key: player.getShieldSprite() }))
  }
}
