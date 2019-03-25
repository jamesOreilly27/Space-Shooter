import Phaser, { Scene } from 'phaser'

export default class Title extends Scene {
  constructor() {
    super({ key: 'Title', active: true })
  }

  preload() {
    this.load.image('player-title', './assets/playerShip1_green.png')
    this.load.image('enemy-title', './assets/enemyRed2.png')
    this.load.image('player-laser', './assets/laserGreen10.png')
  }

  create() {
    this.playerTitle = this.add.image(475, 225, 'player-title').setScale(1.3, 1.3).setAngle(225)
    this.enemyTitle = this.add.image(300, 380, 'enemy-title').setScale(1.15, 1.15).setAngle(45)
    this.enemyLaser = this.add.image(375, 325, 'player-laser').setAngle(225)
  }

  update() {

  }
}
