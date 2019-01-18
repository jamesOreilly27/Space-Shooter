import Phaser from 'phaser'

export default class Ship extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key)
    // this.scene = config.scene
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
    this.scaleX = .8
    this.scaleY = .8
  }
}
