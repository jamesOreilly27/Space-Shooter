import Phaser from 'phaser'

export default class UpgradeContainer extends Phaser.GameObjects.Rectangle {
  constructor(config) {
    super(config.scene, config.x, config.y, config.width, config.height, config.fillColor, config.alpha, config.highlighted)
    this.scene.add.existing(this)
    this.highlighted = config.highlighted
  }

  update() {
    if(this.highlighted) { this.setFillStyle(0x006400, 0.8) }
  }
}
