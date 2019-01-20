import Phaser from 'phaser'

export default class Powerup extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key)
    this.scene = config.scene
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
    this.scaleX = .50
    this.scaleY = .50
    this.scene.tweens.add({
      targets: this,
      props: {
        x: { value: config.x + 12, ease: 'Sine.easeInOut' },
        y: { value: config.y + 12, ease: 'Sine.easeInOut' }
      },
      duration: 1000,
      yoyo: true,
      repeat: -1
    })
  }

  update() {
    //Use this method to create an animation that runs for each power up we render
  }
}
