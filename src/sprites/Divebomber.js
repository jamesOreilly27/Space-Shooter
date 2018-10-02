import Phaser from 'phaser'
import { Ship } from '../sprites'

export default class Divebomber extends Ship {
  constructor(config) {
    super(config)
  }

  move() {
    if(this.x <= 400) this.body.setVelocityX(50)
    else this.body.setVelocityX(-50)
    this.body.setVelocityY(250)
  }

  update() {
    this.move()
  }
}
