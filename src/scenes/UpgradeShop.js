import Phaser, { Scene } from 'phaser'
import { UpgradeContainer, UpgradeButton } from '../UI'

export default class UpgradeShop extends Scene {
  constructor() {
    super({ key: 'UpgradeShop' })
  }

  preload() {
    this.load.image('movement-speed', './assets/movement-speed.png')
    this.load.image('fire-rate', './assets/fire-rate.png')
    this.load.image('laser-upgrade', './assets/laser-upgrade.png')
    this.load.image('upgrade-btn', './assets/upgrade-btn.png')
  }

  addRectangle(x, y, highlighted) {
    return new UpgradeContainer({ scene: this, x: x, y: y, width: 216, height: 300, fillColor: 0x000036, alpha: .8, highlighted: highlighted })
  }

  addUpgradeButton(x, y) {
    return new UpgradeButton({ scene: this, x: x, y: y, key: 'upgrade-btn'})
  }

  addUpgradeText(x, y) {
    this.add.text(x, y, 'UPGRADE', { fontSize: '12px', fontFamily: 'Lato', fill: '#0A0A0A' })
  }

  findHighlightedIndex(containers) {
    for(let i = 0; i < containers.length; i++) {
      if(containers[i].highlighted) return i
    }
  }

  moveRight() {
    if(!this.containers[this.containers.length - 1].highlighted) {
      let highlightedIndex = this.findHighlightedIndex(this.containers)
      this.containers[highlightedIndex].flipHighlighted()
      this.containers[highlightedIndex + 1].flipHighlighted()
    }
  }

  moveLeft() {
    if(!this.containers[0].highlighted) {
      let highlightedIndex = this.findHighlightedIndex(this.containers)
      this.containers[highlightedIndex].flipHighlighted()
      this.containers[highlightedIndex - 1].flipHighlighted()
    }
  }

  upgradePlayer() {
    let index = findHighlightedIndex(this.containers)
    if(index === 0) { this.upgradeSpeed() }
    if(index === 1) { this.upgradeFireRate() }
    if(index === 2) { this.upgradeLaser() }
  }

  create() {
    this.player = this.scene.settings.data.player
    this.playerConfig = {
      scene: {},
      key: 'player',
      x: 100,
      y: 450,
      speed: this.player.speed,
      fireRate: this.player.fireRate,
      shieldLevel: this.player.shieldLevel,
      laserLevel: this.player.laserLevel
    }

    console.log(this.playerConfig)
    this.moveSpeedContainer = this.addRectangle(140, 300, true)
    this.moveSpeedImage = this.add.image(146, 300, 'movement-speed')
    this.moveSpeedButton = this.addUpgradeButton(146, 400)
    this.addUpgradeText(121, 393)

    this.fireRateContainer = this.addRectangle(400, 300, false)
    this.fireRateImage = this.add.image(406, 285, 'fire-rate')
    this.fireRateButton = this.addUpgradeButton(406, 400)
    this.addUpgradeText(381, 393)

    this.laserContainer = this.addRectangle(660, 300, false)
    this.laserImage = this.add.image(666, 285, 'laser-upgrade')
    this.laserButton = this.addUpgradeButton(666, 400)
    this.addUpgradeText(641, 393)

    this.cursors = this.input.keyboard.createCursorKeys()
    this.containers = [this.moveSpeedContainer, this.fireRateContainer, this.laserContainer]
    this.upgradeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
  }

  update() {
    if(this.cursors.right.isDown) {
      this.moveRight(this.containers)
      this.cursors.right.reset()
    }
    if(this.cursors.left.isDown) {
      this.moveLeft(this.containers)
      this.cursors.left.reset()
    }
    this.moveSpeedContainer.update()
    this.fireRateContainer.update()
    this.laserContainer.update()
  }
}
