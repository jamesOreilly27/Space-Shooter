import { Ship } from '../sprites'

export default class Chaser extends Ship {
  constructor(config) {
    super(config)
    this.angle = 180
    this.scaleX = .4
    this.scaleY = .4
  }

  move() {

  }

  shoot() {

  }

  update() {
    super.update()
  }
}