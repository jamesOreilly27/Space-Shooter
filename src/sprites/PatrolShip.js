import Phaser from 'phaser'
import { enemySpecs } from '../scenes/utils/enemies'
import { Ship, PatrolShipLaser } from '../sprites'

export default class PatrolShip extends Ship {
  constructor(config) {
    super(config)
    this.speed = enemySpecs.Patrol.speed
    this.bulletSpeed = enemySpecs.Patrol.bulletSpeed
    this.nextFire = 0
    this.fireRate = enemySpecs.Patrol.fireRate
    this.moveStarted = false
  }

  move() {
    if(this.active) {
      while(!this.moveStarted) {
        this.body.setVelocityX(this.speed)
        this.moveStarted = true
      }
      if(this.x > 800) this.body.setVelocityX(-this.speed)
      else if(this.x < 10) this.body.setVelocityX(this.speed)
    }
  }

  shoot(time, delta) {
    if(time < this.nextFire) { return }
    this.scene.enemyLasers.add(new PatrolShipLaser({ scene: this.scene, x: this.x, y: this.y + 40, key: 'patrol-ship-laser', bulletSpeed: this.bulletSpeed }))
    this.nextFire = time + this.fireRate
  }

  levelUp(scene) {
    this.setSpeed(enemySpecs.Patrol.speed)
    if(this.body.velocity.x < 0) this.body.setVelocityX(-this.speed)
    else if(this.body.velocity.x > 0) this.body.setVelocityX(this.speed)
  }

  update(time, delta) {
    this.move()
    this.shoot(time, delta)
  }
}
