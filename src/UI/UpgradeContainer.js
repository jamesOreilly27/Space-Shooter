import Phaser from 'phaser'

export default class UpgradeContainer extends Phaser.GameObjects.Rectangle {
  constructor(config) {
    super(config.scene, config.x, config.y, config.width, config.height, config.fillColor, config.alpha)
    this.scene.add.existing(this)
  }
}
