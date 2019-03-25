import Phaser, { Scene } from 'phaser'

export default class Title extends Scene {
  constructor() {
    super({ key: 'Title' })
  }

  preload() {
    this.load.image('title-image', './assets/playerShip1_green.png')
  }

  create() {
    
  }

  update() {

  }
}
