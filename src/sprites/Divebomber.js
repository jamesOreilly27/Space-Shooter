import Phaser from 'phaser'
import { Ship } from '../sprites'

export default class Divebomber extends Ship {
  constructor(config) {
    super(config)
  }

  move() {
    this.body.setVelocity(-30, 250)
  }

  update() {
    this.move()
  }
}
