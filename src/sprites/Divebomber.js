import Phaser from 'phaser'
import { enemySpecs } from '../scenes/utils/enemies'
import { Ship, DivebomberLaser } from '../sprites'

export default class Divebomber extends Ship {
  constructor(config) {
    super(config)
    this.shot = false
    this.left = this.x <= 400
    this.speed = enemySpecs.Divebomber.speed
    this.bulletSpeed = enemySpecs.Divebomber.bulletSpeed
  }

  move() {
    if(this.active) {
      if(this.left) this.body.setVelocityX(50)
      else this.body.setVelocityX(-50)
      this.body.setVelocityY(this.speed)
    }
  }

  shoot() {
    while(!this.shot) {
      this.scene.enemyLasers.add(new DivebomberLaser({ scene: this.scene, x: this.x, y: this.y, key: 'divebomber-laser', bulletSpeed: this.bulletSpeed}))
      this.shot = true
    }
  }

  levelUp(scene) {
    this.setSpeed(enemySpecs.Divebomber.speed)
    this.setBulletSpeed(enemySpecs.Divebomber.bulletSpeed)
  }

  update() {
    this.move()
    this.shoot()
  }
}
