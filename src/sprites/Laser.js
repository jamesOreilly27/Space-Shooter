import Phaser from 'phaser'

export default class Laser extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key)
    this.scene = config.scene
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
  }

  update() {
    if(!this.body.velocity.y) this.body.setVelocityY(-750)
    if(this.y >= 610 || this.y <= -10) this.destroy()
  }
}
