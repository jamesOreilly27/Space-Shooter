import Phaser, { Scene } from 'phaser'

export default class Title extends Scene {
  constructor() {
    super({ key: 'Title', active: true })
  }

  preload() {
    this.load.image('title-image', './assets/playerShip1_green.png')
  }

  create() {
    this.titleImage = this.add.image(400, 400, 'title-image')
    console.log(this.titleImage)
  }

  update() {

  }
}
