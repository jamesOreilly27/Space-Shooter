import Phaser from 'phaser'

export default class Powerup extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key)
    this.scene = config.scene
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
    this.scaleX = .75
    this.scaleY = .75
  }

  update() {
    //Use this method to create an animation that runs for each power up we render
  }
}
