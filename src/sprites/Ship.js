import Phaser from 'phaser'

export default class Ship extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key, config.path)
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
    this.key = config.key
    this.scaleX = .4
    this.scaleY = .4
    this.speed = 0
    this.bulletSpeed = 0
    this.fireRate = 0
  }

  setFireRate(newRate) {
    this.fireRate = newRate
  }

  setSpeed(newSpeed) {
    this.speed = newSpeed
  }

  setBulletSpeed(newSpeed) {
    this.bulletSpeed = newSpeed
  }

  explode() {
    const explosion = this.scene.physics.add.sprite(this.x, this.y, 'explosion')
    explosion.play('explode')
    this.destroy()
  }

  updateScore() {
    if(this.key === 'divebomber') this.scene.score += 5
    if(this.key === 'fighter') this.scene.score +=2
    if(this.key === 'chaser') this.scene.score += 3
    if(this.key === 'patrol-ship') this.scene.score += 3
    this.scene.scoreText.setText(`score: ${this.scene.score}`)
  }

  enemyExplode() {
    this.updateScore()
    this.explode()
  }
}
