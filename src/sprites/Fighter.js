import Phaser from 'phaser'
import { Ship, FighterLaser } from '../sprites'

export default class Fighter extends Ship {
  constructor(config) {
    super(config)
    this.follower = { t: 0, vec: new Phaser.Math.Vector2() }
    this.path = config.path
    this.speed = 1/80000
    this.shot = false
  }

  startOnPath() {
    this.follower.t = 0
    this.path.getPoint(this.follower.t, this.follower.vec)
    this.setPosition(this.follower.vec.x, this.follower.vec.y);
  }

  generateLaserPair() {
    this.scene.enemyLasers.add(new FighterLaser({ scene: this.scene, key: 'fighter-laser', x: this.x - 5, y: this.y + 40 }))
    this.scene.enemyLasers.add(new FighterLaser({ scene: this.scene, key: 'fighter-laser', x: this.x + 5, y: this.y + 40 }))
    
  }

  shoot() {
    this.generateLaserPair()
    this.shot = true
  }

  update(time, delta) {
    if(this.follower.t === 0) this.startOnPath()
    this.follower.t += this.speed * delta
    this.path.getPoint(this.follower.t, this.follower.vec)
    this.setPosition(this.follower.vec.x, this.follower.vec.y)
    if(!this.shot) this.shoot()
  }
}
