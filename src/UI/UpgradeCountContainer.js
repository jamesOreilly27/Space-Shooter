import Phaser from 'phaser'

export default class UpgradeCountContainer extends Phaser.GameObjects.Rectangle {
  constructor(config) {
    super(config.scene, config.x, config.y, config.width, config.height, config.fillColor, config.alpha, config.filled)
    this.scene.add.existing(this)
    this.filled = config.filled
  }
}
