import Phaser from 'phaser'
import { killOffScreen } from './utils'

export default class Laser extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key)
    this.scene = config.scene
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
    this.scaleX = .6
    this.scaleY = .6
  }

  update() {
    killOffScreen(this)
  }
}
