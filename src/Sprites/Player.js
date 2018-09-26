import Phaser, { GameObjects } from 'phaser'

export default class Player {
  constructor(sprite, cursors) {
    this.sprite = sprite
    this.cursors = cursors
  }

  movement() {
    const sprite = this.sprite
    const cursors = this.cursors

    if(cursors.left.isDown) sprite.setVelocityX(-250)
    else if(cursors.right.isDown) sprite.setVelocityX(250)
    else sprite.setVelocityX(0)

    if(cursors.down.isDown) sprite.setVelocityY(250)
    else if(cursors.up.isDown) sprite.setVelocityY(-250)
    else sprite.setVelocityY(0)
  }
}