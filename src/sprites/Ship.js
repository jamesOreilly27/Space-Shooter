import Phaser from 'phaser'

export default class Ship extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key, config.path)
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
    this.scaleX = .4
    this.scaleY = .4
  }

  explode() {
    const explosion = this.scene.physics.add.sprite(this.x, this.y, 'explosion')
    explosion.play('explode')
    this.destroy()
  }
}
