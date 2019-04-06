import Phaser from 'phaser'

export default class UpgradeCounter extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key, config.filled)
    this.scene.add.existing(this)
    this.setScale(.25)
    this.setTint(0x0A0A0A).setAlpha(.5)
  }
}
