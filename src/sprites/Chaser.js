import { Ship } from '../sprites'

export default class Chaser extends Ship {
  constructor(config) {
    super(config)
    this.angle = 180
    this.scaleX = .4
    this.scaleY = .4
  }

  move() {
    if(this.active) {
      this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, 150)
    }
  }

  update() {
    super.update()
    this.move()
  }
}
