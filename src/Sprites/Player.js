import Phaser from 'phaser'
import { Laser } from '../sprites'

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key)
    this.scene = config.scene
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
    this.body.setCollideWorldBounds(true)
  }
  move(cursors) {
    if(this.active) {
      if(cursors.left.isDown) this.body.setVelocityX(-250)
      else if(cursors.right.isDown) this.body.setVelocityX(250)
      else this.body.setVelocityX(0)
  
      if(cursors.down.isDown) this.body.setVelocityY(250)
      else if(cursors.up.isDown) this.body.setVelocityY(-250)
      else this.body.setVelocityY(0)
    }
  }

  shoot(spriteString) {
    const spacebar = this.scene.cursors.space
    const laserRechargeCount = this.scene.updateCount
    if(
      spacebar.isDown && 
      ((laserRechargeCount % 20 === 0) || this.scene.time.now - spacebar.timeDown < 20)
    ) {
      this.scene.lasers.add(new Laser({ scene: this.scene, x: this.x, y: this.y -80, key: spriteString }))
    }
  }

  update() {
    this.move(this.scene.cursors) 
    this.shoot('player-laser')
    this.scene.lasers.children.entries.forEach(laser => { laser.update() })
  }
}
