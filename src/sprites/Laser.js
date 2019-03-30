import Phaser from 'phaser'
import { killOffScreen } from './utils'

export default class Laser extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key, config.bulletSpeed)
    this.scene = config.scene
    this.key = config.key
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
    this.scaleX = .3
    this.scaleY = .3
  }

  updateScore() {
    this.scene.score += 3
    this.scene.scoreText.setText(`SCORE: ${this.scene.score}`)
  }

  update() {
    killOffScreen(this)
  }
}
