import { Powerup } from '../sprites'

export default class Bomb extends Powerup {
  constructor(config) {
    super(config)
    this.scaleX = .15
    this.scaleY = .15
  }

  handleCollision() {
    const bombExplosion = this.scene.physics.add.sprite(this.x, this.y, 'bomb-explosion')
    bombExplosion.scaleX = 4
    bombExplosion.scaleY = 4
    bombExplosion.play('bomb-explode')
  }
}
