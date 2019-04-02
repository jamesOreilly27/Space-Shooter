import Phaser from 'phaser'

export default class UpgradeButton extends Phaser.GameObjects.Image {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key)
    this.scene.add.existing(this)
    this.setScale(.3)
  }
}
