import Phaser from 'phaser'
import { Ship } from '../sprites'

export default class Fighter extends Ship {
  constructor(config) {
    super(config)
    this.follower = { t: 0, vec: new Phaser.Math.Vector2() }
    this.path = config.path
    this.body.setCollideWorldBounds(true)
    this.speed = 1/15000
  }

  startOnPath() {
    this.follower.t = 0
    this.path.getPoint(this.follower.t, this.follower.vec)
    this.setPosition(this.follower.vec.x, this.follower.vec.y);
  }

  update(time, delta) {
    if(this.follower.t === 0) this.startOnPath()
    this.follower.t += this.speed * delta
    this.path.getPoint(this.follower.t, this.follower.vec)
    this.setPosition(this.follower.vec.x, this.follower.vec.y)
  }
}
