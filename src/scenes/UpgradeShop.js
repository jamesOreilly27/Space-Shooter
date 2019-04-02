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

  create() {

  }

  update() {

  }
}
