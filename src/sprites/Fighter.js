import Phaser from 'phaser'
import { Ship, FighterLaser } from '../sprites'
import { enemySpecs } from '../scenes/utils/enemies'

export default class Fighter extends Ship {
  constructor(config) {
    super(config)
    this.follower = { t: 0, vec: new Phaser.Math.Vector2() }
    this.path = config.path
    this.speed = enemySpecs.Fighter.speed
    this.nextFire = 0
    this.fireRate = enemySpecs.Fighter.fireRate
  }

  startOnPath() {
    this.follower.t = 0
    this.path.getPoint(this.follower.t, this.follower.vec)
    this.setPosition(this.follower.vec.x, this.follower.vec.y);
  }

  generateLaserPair() {
    this.scene.enemyLasers.add(new FighterLaser({ scene: this.scene, key: 'fighter-laser', x: this.x - 3, y: this.y + 25 }))
    this.scene.enemyLasers.add(new FighterLaser({ scene: this.scene, key: 'fighter-laser', x: this.x + 3, y: this.y + 25 }))
    
  }

  shoot(time, delta) {
    if(time < this.nextFire) { return }
    this.generateLaserPair()
    this.nextFire = time + this.fireRate
  }

  levelUp() {
    this.setSpeed(enemySpecs.Fighter.speed)
    this.setFireRate(enemySpecs.Fighter.fireRate)
  }

  update(time, delta) {
    if(this.follower.t === 0) this.startOnPath()
    this.follower.t += enemySpecs.Fighter.speed * delta
    this.path.getPoint(this.follower.t, this.follower.vec)
    this.setPosition(this.follower.vec.x, this.follower.vec.y)
    this.shoot(time, delta)
  }
}
