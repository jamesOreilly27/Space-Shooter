import { Powerup } from '../sprites'

export default class Bomb extends Powerup {
  constructor(config) {
    super(config)
    this.scaleX = .15
    this.scaleY = .15
  }

  handleCollision() {
    const bombExplosion = this.scene.physics.add.sprite(this.x, this.y, 'bomb-explosion')
    this.scene.playerLasers.add(bombExplosion)
    bombExplosion.scaleX = 7
    bombExplosion.scaleY = 5
    bombExplosion.setCircle(35, 18, 14)
    bombExplosion.play('bomb-explode')
  }
}
