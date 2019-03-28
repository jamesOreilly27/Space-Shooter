import { Powerup } from '../sprites'

export default class Bomb extends Powerup {
  constructor(config) {
    super(config)
    this.scaleX = .15
    this.scaleY = .15
  }
}
