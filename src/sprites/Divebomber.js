import Phaser from 'phaser'
import { Ship, DivebomberLaser } from '../sprites'

export default class Divebomber extends Ship {
  constructor(config) {
    super(config)
    this.shot = false
  }

  move() {
    if(this.active) {
      if(this.x <= 400) this.body.setVelocityX(50)
      else this.body.setVelocityX(-50)
      this.body.setVelocityY(250)
    }
  }

  shoot() {
    while(!this.shot) {
      this.scene.enemyLasers.add(new DivebomberLaser({ scene: this.scene, x: this.x, y: this.y, key: 'divebomber-laser'}))
      this.shot = true
    }
  }

  update() {
    this.move()
    this.shoot()
  }
}
