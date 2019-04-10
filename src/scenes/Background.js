import Phaser, { Scene } from 'phaser'

export default class Background extends Scene {
  constructor() {
    super({ key: 'Background', active: true })
  }

  preload() {
    this.load.image('space', './assets/space.jpg')
  }

  create() {
    this.add.image(400, 300, 'space')
  }
}
