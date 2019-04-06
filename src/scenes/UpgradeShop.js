import Phaser, { Scene } from 'phaser'
import { UpgradeContainer, UpgradeButton, UpgradeCounter, UpgradeCountContainer } from '../UI'
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

  addEmptyUpgradeCounters(x, filled1, filled2, filled3) {
    return [
      new UpgradeCountContainer({ scene: this, x: x, y: 190, width: 31.25, height: 31.25, fillColor: 0x0A0A0A, alpha: 0.5, filled: filled1 }),
      new UpgradeCountContainer({ scene: this, x: x + 50, y: 190, width: 31.25, height: 31.25, fillColor: 0x0A0A0A, alpha: 0.5, filled: filled2 }),
      new UpgradeCountContainer({ scene: this, x: x + 100, y: 190, width: 31.25, height: 31.25, fillColor: 0x0A0A0A, alpha: 0.5, filled: filled3 })
    ]
  }

  addMovementSpeedCounters(x) {
    let level1 = false
    let level2 = false
    let level3 = false

    if(this.player.speed === 175) { level1 = true }
    if(this.player.speed === 200) { level2 = true }
    if(this.player.speed === 225) { level3 = true }

    return addEmptyUpgradeContainers(x, level1, level2, level3)
  }


  addUpgradeCounter() {
    const index = this.findHighlightedIndex(this.containers)
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

  upgradeSpeed() { this.playerConfig.speed += 25 }

  upgradeFireRate() { this.playerConfig.fireRate -= 100 }

  upgradeLaser() { this.playerConfig.laserLevel++ }

  upgradePlayer() {
    let index = this.findHighlightedIndex(this.containers)
    if(index === 0) { this.upgradeSpeed() }
    if(index === 1) { this.upgradeFireRate() }
    if(index === 2) { this.upgradeLaser() }
    this.upgrades--
    this.playerConfig.upgradeCount++
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
      upgradeCount: this.player.upgradeCount
    }

    this.upgradeText = this.add.text(300, 16, `UPGRADES: ${this.upgrades}`, { fontSize: '32px', fontFamily: 'Space Mono', fill: '#FFF'})

    this.moveSpeedContainer = this.addRectangle(140, 300, true)
    this.moveSpeedImage = this.add.image(146, 300, 'movement-speed')
    this.moveSpeedButton = this.addUpgradeButton(146, 400)
    this.addUpgradeText(121, 393)
    this.movementCountContainers = this.addEmptyUpgradeCounters(96)

    this.fireRateContainer = this.addRectangle(400, 300, false)
    this.fireRateImage = this.add.image(406, 285, 'fire-rate')
    this.fireRateButton = this.addUpgradeButton(406, 400)
    this.addUpgradeText(381, 393)
    this.fireRateCountContainers = this.addEmptyUpgradeCounters(355)

    this.laserContainer = this.addRectangle(660, 300, false)
    this.laserImage = this.add.image(666, 285, 'laser-upgrade')
    this.laserButton = this.addUpgradeButton(666, 400)
    this.addUpgradeText(641, 393)
    this.laserCountContainers = this.addEmptyUpgradeCounters(615)

    this.cursors = this.input.keyboard.createCursorKeys()
    this.containers = [ this.moveSpeedContainer, this.fireRateContainer, this.laserContainer ]
    this.counters = [ this.movementCountContainers, this.fireRateCountContainers, this.laserCountContainers ]
    this.upgradeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
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
      this.upgradePlayer()
      this.upgradeKey.reset()
      this.addUpgradeCounter()
      this.updateUpgradeText()
    }
    this.moveSpeedContainer.update()
    this.fireRateContainer.update()
    this.laserContainer.update()
  }
}
