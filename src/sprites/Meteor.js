import Phaser from 'phaser'

export default class Meteor extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key)
  }
}
