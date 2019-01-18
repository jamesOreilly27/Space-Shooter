import Phaser from 'phaser'
import { LaserPowerup, ShieldPowerup } from '../sprites'

export default class Meteor extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key)
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
  }

  generateRandomPowerUp() {
    const randNum = Math.floor(Math.random() * 2)
    if(randNum === 0) return new LaserPowerup({ scene: this.scene, x: this.x, y: this.y, key: 'gun-upgrade' })
    if(randNum === 1) return new ShieldPowerup({ scene: this.scene, x: this.x, y: this.y, key: this.scene.player.getShieldPowerupSprite() })
  }

  drop() {
    this.scene.powerups.add(this.generateRandomPowerUp())
    this.destroy()
  }
}
