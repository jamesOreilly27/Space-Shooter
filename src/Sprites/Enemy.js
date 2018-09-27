export default class Enemy {
  constructor(sprite) {
    this.sprite = sprite
  }

  move() {

  }

  destroy(enemy, laser) {
    enemy.disableBody(true, true)
    laser.disableBody(true, true)
  }
}
