import Phaser, { Scene } from 'phaser'

export default class Death extends Scene {
  constructor() {
    super({ key: 'Death' })
  }

  create() {
    this.add.text(250, 50, 'GAME', { fontSize: '100px', fontFamily: 'Josefin Sans', fill: '#32CD32' })
    this.add.text(250, 150, 'OVER', { fontSize: '100px', fontFamily: 'Josefin Sans', fill: '#32CD32' })
    this.add.text(175, 350, `${this.scene.settings.data.score} POINTS`, { fontSize: '75px', fontFamily: 'Space Mono', fill: '#32CD32' })
    this.add.text(200, 500, 'press space to play again', { fontSize: '30px', fontFamily: 'Josefin Sans', fill: '#32CD32' })

    this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
  }

  update() {
    if(this.startKey.isDown) {
      console.log(this.scene)
      this.scene.manager.stop('Battlefield')
      this.startKey.reset()
      this.scene.start('Battlefield')
    }
  }
}
