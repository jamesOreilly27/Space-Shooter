import Phaser, { GameObjects } from 'phaser'

export default class Player {
  constructor(sprite) {
    this.sprite = sprite
    this.laser = {}
  }

  move(cursors) {
    const sprite = this.sprite

    if(cursors.left.isDown) sprite.setVelocityX(-250)
    else if(cursors.right.isDown) sprite.setVelocityX(250)
    else sprite.setVelocityX(0)

    if(cursors.down.isDown) sprite.setVelocityY(250)
    else if(cursors.up.isDown) sprite.setVelocityY(-250)
    else sprite.setVelocityY(0)
  }

  shoot(scene, spriteString) {
    const spacebar = scene.cursors.space
    const interval = Math.floor( (scene.time.now - spacebar.timeDown) / 10) * 10
    if(spacebar.isDown && interval % 150 === 0) {
      this.laser = scene.physics.add.sprite(this.sprite.x, this.sprite.y - 60, spriteString)
      this.laser.setVelocityY(-750)
    }
  }
}
