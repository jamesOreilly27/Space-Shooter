import Phaser, { GameObjects } from 'phaser'

export default class Player {
  constructor(sprite) {
    this.sprite = sprite
  }

  movement(cursors) {
    const sprite = this.sprite

    if(cursors.left.isDown) sprite.setVelocityX(-250)
    else if(cursors.right.isDown) sprite.setVelocityX(250)
    else sprite.setVelocityX(0)

    if(cursors.down.isDown) sprite.setVelocityY(250)
    else if(cursors.up.isDown) sprite.setVelocityY(-250)
    else sprite.setVelocityY(0)
  }
}