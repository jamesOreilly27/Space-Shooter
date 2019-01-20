import Phaser from 'phaser'

export default class Wreckage extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key)
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
  }
}