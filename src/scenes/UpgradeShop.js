import Phaser, { Scene } from 'phaser'
import { UpgradeContainer, UpgradeButton } from '../UI'

export default class UpgradeShop extends Scene {
  constructor() {
    super({ key: 'UpgradeShop', active: true })
  }

  preload() {
    this.load.image('movement-speed', './assets/movement-speed.png')
    this.load.image('fire-rate', './assets/fire-rate.png')
    this.load.image('laser-upgrade', './assets/laser-upgrade.png')
    this.load.image('upgrade-btn', './assets/upgrade-btn.png')
  }

  addRectangle(x, y) {
    return new UpgradeContainer({ scene: this, x: x, y: y, width: 216, height: 300, fillColor: 0x000036, alpha: .8 })
  }

  addUpgradeButton(x, y) {
    return new UpgradeButton({ scene: this, x: x, y: y, key: 'upgrade-btn'})
  }

  addUpgradeText(x, y) {
    this.add.text(x, y, 'UPGRADE', { fontSize: '12px', fontFamily: 'Lato', fill: '#0A0A0A' })
  }

  create() {
    this.moveSpeedContainer = this.addRectangle(140, 300)
    this.moveSpeedImage = this.add.image(146, 300, 'movement-speed')
    this.moveSpeedButton = this.addUpgradeButton(146, 400)
    this.addUpgradeText(121, 393)

    this.fireRateContainer = this.addRectangle(400, 300)
    this.fireRateImage = this.add.image(406, 285, 'fire-rate')
    this.fireRateButton = this.addUpgradeButton(406, 400)
    this.addUpgradeText(381, 393)
  }

  update() {

  }
}
