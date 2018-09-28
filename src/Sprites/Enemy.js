export default class Enemy {
  constructor(sprite) {
    this.sprite = sprite
  }

  move(updateCount) {
    if(updateCount < 50) {
      this.sprite.setVelocityX(-100)
      this.sprite.setVelocityY(30)
    }
    else if(updateCount < 100) {
      this.sprite.setVelocityX(30)
      this.sprite.setVelocityY(100)
    }
    else if(updateCount < 150) {
      this.sprite.setVelocityX(100)
      this.sprite.setVelocityY(-30)
    }
    else {
      this.sprite.setVelocityX(-30)
      this.sprite.setVelocityY(-100)
    }
  }
}
