import Phaser from 'phaser'

export default class Shield extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key)
    this.scene = config.scene
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
    this.scaleX = .7
    this.scaleY = .7
  }

  move() {
    //first if statement will check if the shield has hit the left or right side of the game area
    if(this.x > 41.6 && this.x < 760) {
      if(this.scene.cursors.left.isDown) this.body.setVelocityX(-250)
      else if(this.scene.cursors.right.isDown) this.body.setVelocityX(250)
      else this.body.setVelocityX(0)
    } 
    else if(this.x > 41.6 && this.x >= 760) {
      if(this.scene.cursors.left.isDown) this.body.setVelocityX(-250)
      else this.body.setVelocityX(0)
    } 
    else if(this.x <= 41.6 && this.x < 760) {
      if(this.scene.cursors.right.isDown) this.body.setVelocityX(250)
      else this.body.setVelocityX(0)
    }
  
    //this if statement will test if the shield has hit the top or the bottom of the game area
    if(this.y > 29.16 && this.y < 568.2) {
      if(this.scene.cursors.down.isDown) this.body.setVelocityY(250)
      else if(this.scene.cursors.up.isDown) this.body.setVelocityY(-250)
      else this.body.setVelocityY(0)
    }
    else if(this.y > 29.16 && this.y >= 568.2) {
      if(this.scene.cursors.up.isDown) this.body.setVelocityY(-250)
      else this.body.setVelocityY(0)
    }
    else if(this.y <= 29.16 && this.y < 568.2) {
      if(this.scene.cursors.down.isDown) this.body.setVelocityY(250)
      else this.body.setVelocityY(0)
    }
  }

  handleCollision() {
    this.scene.player.shieldLevel--
  }

  update() {
    this.move()
    // if(!this.body.collideWorldBounds) this.body.setCollideWorldBounds(true)
  }
}
