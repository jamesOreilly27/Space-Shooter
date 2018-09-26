import Phaser, { Scene } from 'phaser'

export class Background extends Scene {
  constructor() {
    super({ key: 'Background', active: true })
  }

  preload() {
    this.load.image('space', './assets/space.jpg')
  }

  create() {
    this.image.add(400, 300, 'space')
  }
}