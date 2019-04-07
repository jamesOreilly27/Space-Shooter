import Phaser, { Scene } from 'phaser'
import { UpgradeCountContainer } from '../UI'
import { addRectangle, addUpgradeButton, addUpgradeText, carryOverUpgrades, findHighlightedIndex, upgradePlayer } from './utils/upgradeShop'
import { Level3 } from './utils/levels'
import { Player } from '../sprites';

export default class UpgradeShop extends Scene {
  constructor() {
    super({ key: 'UpgradeShop' })
  }

  preload() {
    this.load.image('movement-speed', './assets/movement-speed.png')
    this.load.image('fire-rate', './assets/fire-rate.png')
    this.load.image('laser-upgrade', './assets/laser-upgrade.png')
    this.load.image('upgrade-btn', './assets/upgrade-btn.png')
    this.load.image('upgrade-counter', './assets/upgrade-counter.png')
  }

  addEmptyUpgradeCounters(x, filled1, filled2, filled3) {
    return [
      new UpgradeCountContainer({ scene: this, x: x, y: 190, width: 31.25, height: 31.25, fillColor: 0x0A0A0A, alpha: 0.5, filled: filled1 }),
      new UpgradeCountContainer({ scene: this, x: x + 50, y: 190, width: 31.25, height: 31.25, fillColor: 0x0A0A0A, alpha: 0.5, filled: filled2 }),
      new UpgradeCountContainer({ scene: this, x: x + 100, y: 190, width: 31.25, height: 31.25, fillColor: 0x0A0A0A, alpha: 0.5, filled: filled3 })
    ]
  }

  addUpgradeCounter() {
    const index = findHighlightedIndex(this.containers)
    for(let i = 0; i < this.counters[index].length; i++) {
      if(!this.counters[index][i].filled) {
        this.add.image(this.counters[index][i].x, this.counters[index][i].y, 'upgrade-counter').setScale(.25)
        this.counters[index][i].filled = true
        return 
      }
    }

  }

  moveRight() {
    if(!this.containers[this.containers.length - 1].highlighted) {
      let highlightedIndex = findHighlightedIndex(this.containers)
      this.containers[highlightedIndex].flipHighlighted()
      this.containers[highlightedIndex + 1].flipHighlighted()
    }
  }

  moveLeft() {
    if(!this.containers[0].highlighted) {
      let highlightedIndex = findHighlightedIndex(this.containers)
      this.containers[highlightedIndex].flipHighlighted()
      this.containers[highlightedIndex - 1].flipHighlighted()
    }
  }

  updateUpgradeText() {
    this.upgradeText.setText(`UPGRADES: ${this.upgrades}`)
  }

  create() {
    this.player = this.scene.settings.data.player
    this.score = this.scene.settings.data.score
    this.level = this.scene.settings.data.level
    this.upgrades = this.scene.settings.data.upgrades
    this.playerConfig = {
      scene: {},
      key: 'player',
      x: 100,
      y: 450,
      speed: this.player.speed,
      fireRate: this.player.fireRate,
      shieldLevel: this.player.shieldLevel,
      laserLevel: this.player.laserLevel,
      moveUpgrades: this.player.moveUpgrades,
      fireRateUpgrades: this.player.fireRateUpgrades,
      laserUpgrades: this.player.laserUpgrades,
      upgradeCount: this.player.upgradeCount
    }

    this.upgradeText = this.add.text(300, 16, `UPGRADES: ${this.upgrades}`, { fontSize: '32px', fontFamily: 'Space Mono', fill: '#FFF'})

    this.moveSpeedContainer = addRectangle(this, 140, 300, true)
    this.moveSpeedImage = this.add.image(146, 300, 'movement-speed')
    this.moveSpeedButton = addUpgradeButton(this, 146, 400)
    addUpgradeText(this, 121, 393)
    this.movementCountContainers = this.addEmptyUpgradeCounters(96)

    this.fireRateContainer = addRectangle(this, 400, 300, false)
    this.fireRateImage = this.add.image(406, 285, 'fire-rate')
    this.fireRateButton = addUpgradeButton(this, 406, 400)
    addUpgradeText(this, 381, 393)
    this.fireRateCountContainers = this.addEmptyUpgradeCounters(355)

    this.laserContainer = addRectangle(this,660, 300, false)
    this.laserImage = this.add.image(666, 285, 'laser-upgrade')
    this.laserButton = addUpgradeButton(this, 666, 400)
    addUpgradeText(this, 641, 393)
    this.laserCountContainers = this.addEmptyUpgradeCounters(615)

    this.cursors = this.input.keyboard.createCursorKeys()
    this.containers = [ this.moveSpeedContainer, this.fireRateContainer, this.laserContainer ]
    this.counters = [ this.movementCountContainers, this.fireRateCountContainers, this.laserCountContainers ]
    this.upgradeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    carryOverUpgrades(this, this.movementCountContainers, this.playerConfig.moveUpgrades)
    carryOverUpgrades(this, this.fireRateCountContainers, this.playerConfig.fireRateUpgrades)
    carryOverUpgrades(this, this.laserCountContainers, this.playerConfig.laserUpgrades)
  }

  update() {
    if(!this.upgrades) this.scene.start('Battlefield', { score: this.score, level: this.level, playerConfig: this.playerConfig})
    if(this.cursors.right.isDown) {
      this.moveRight(this.containers)
      this.cursors.right.reset()
    }
    if(this.cursors.left.isDown) {
      this.moveLeft(this.containers)
      this.cursors.left.reset()
    }
    if(this.upgradeKey.isDown) {
      upgradePlayer(this, this.playerConfig)
      this.upgradeKey.reset()
      this.addUpgradeCounter()
      this.updateUpgradeText()
    }
    this.moveSpeedContainer.update()
    this.fireRateContainer.update()
    this.laserContainer.update()
  }
}
