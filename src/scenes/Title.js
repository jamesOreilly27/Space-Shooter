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
    this.titleText = this.add.text(105, 40, 'Space Shooter', { fontSize: '75px', fill: '#32CD32' })

    this.playerTitle = this.add.image(475, 225, 'player-title').setScale(1.3, 1.3).setAngle(225)
    this.enemyTitle = this.add.image(300, 380, 'enemy-title').setScale(1.15, 1.15).setAngle(45)
    this.enemyLaser = this.add.image(375, 325, 'player-laser').setAngle(225)

    this.input.manager.enabled = true
    this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    
    this.startPrompt = this.add.text(65, 500, 'Press Spacebar to Start', { fontSize: '50px', fill: '#32CD32' })
  }

  update() {
    if(this.startKey.isDown) this.scene.start('Battlefield')
  }
}