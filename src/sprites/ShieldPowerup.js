import { Powerup } from '../sprites'

export default class ShieldPowerup extends Powerup {
  constructor(config) {
    super(config)
  }

  handleCollision() {
    console.log('TESTING')
  }
}
