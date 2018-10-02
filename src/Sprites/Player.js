import Phaser from 'phaser'
import { Ship, PlayerLaser } from '../sprites'

export default class Player extends Ship {
  constructor(config) {
    super(config)
    this.body.setCollideWorldBounds(true)
  }
  
  move(cursors) {
    if(cursors.left.isDown) this.body.setVelocityX(-250)
    else if(cursors.right.isDown) this.body.setVelocityX(250)
    else this.body.setVelocityX(0)
  
    if(cursors.down.isDown) this.body.setVelocityY(250)
    else if(cursors.up.isDown) this.body.setVelocityY(-250)
    else this.body.setVelocityY(0)
  }

  shoot(spriteString) {
    const spacebar = this.scene.cursors.space
    const laserRechargeCount = this.scene.updateCount
    if(
      spacebar.isDown && 
      ((laserRechargeCount % 20 === 0) || this.scene.time.now - spacebar.timeDown < 20)
    ) {
      this.scene.playerLasers.add(new PlayerLaser({ scene: this.scene, x: this.x, y: this.y -40, key: spriteString }))
    }
  }

  update() {
    if(this.active) {
      this.move(this.scene.cursors) 
      this.shoot('player-laser')
    }
  }
}
