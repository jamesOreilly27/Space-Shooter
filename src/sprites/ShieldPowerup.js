import { Powerup } from '../sprites'

export default class ShieldPowerup extends Powerup {
  constructor(config) {
    super(config)
  }

  setSprite() {
    const shieldLevel = this.scene.player.shieldLevel
    if(shieldLevel === 0) return 'bronze-shield'
    else if(shieldLevel === 1) return 'silver-shield'
    else return 'gold-shield'
  }

  handleCollision() {
    console.log('TESTING')
  }
}
