import Phaser from 'phaser'

export default class Shield extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key)
    this.scene = config.scene
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
  }

  move() {
    if(this.scene.cursors.left.isDown) this.body.setVelocityX(-250)
    else if(this.scene.cursors.right.isDown) this.body.setVelocityX(250)
    else this.body.setVelocityX(0)
  
    if(this.scene.cursors.down.isDown) this.body.setVelocityY(250)
    else if(this.scene.cursors.up.isDown) this.body.setVelocityY(-250)
    else this.body.setVelocityY(0)
  }

  handleCollision() {

  }

  update() {
    this.move()
  }
}
