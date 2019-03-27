import { Ship } from '../sprites'
import { enemySpecs } from '../scenes/utils/enemies'

export default class Chaser extends Ship {
  constructor(config) {
    super(config)
    this.angle = 180
    this.scaleX = .2
    this.scaleY = .2
    this.speed = enemySpecs.Chaser.speed
  }

  move() {
    if(this.active) {
      this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, this.speed)
    }
  }

  levelUp() {
    this.setSpeed(enemySpecs.Chaser.speed)
  }

  update() {
    super.update()
    this.move()
  }
}
