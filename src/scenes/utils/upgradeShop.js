import { UpgradeContainer, UpgradeButton } from '../../UI'

/********** Add Images and Sprites to Scene **********/
export const addRectangle = (scene, x, y, highlighted) => {
  return new UpgradeContainer({ scene: scene, x: x, y: y, width: 216, height: 300, fillColor: 0x000036, alpha: .8, highlighted: highlighted })
}

export const addUpgradeButton = (scene, x, y) => { return new UpgradeButton({ scene: scene, x: x, y: y, key: 'upgrade-btn'}) }

export const addUpgradeText = (scene, x, y) => {
  scene.add.text(x, y, 'UPGRADE', { fontSize: '12px', fontFamily: 'Lato', fill: '#0A0A0A' })
}

export const carryOverUpgrades = (scene, countContainers, typeUpgradeCount) => {
  for(let i = 0; i < typeUpgradeCount; i++) {
    scene.add.image(countContainers[i].x, countContainers[i].y, 'upgrade-counter').setScale(.25)
    countContainers[i].filled = true
  }
}

/********** Upgrade Shop UI**********/
export const findHighlightedIndex = containers => {
  for(let i = 0; i < containers.length; i++) {
    if(containers[i].highlighted) return i
  }
}

/********** Upgrade Player **********/
export const upgradeSpeed = playerConfig => {
  playerConfig.speed += 25
  playerConfig.moveUpgrades++
}

export const upgradeFireRate = playerConfig => {
  playerConfig.fireRate -= 100
  playerConfig.fireRateUpgrades++
}

export const upgradeLaser = playerConfig => {
  playerConfig.laserLevel++
  playerConfig.laserUpgrades++
}

export const upgradePlayer = (scene, playerConfig) => {
  let index = findHighlightedIndex(scene.containers)
  if(index === 0) { upgradeSpeed(playerConfig) }
  if(index === 1) { upgradeFireRate(playerConfig) }
  if(index === 2) { upgradeLaser(playerConfig) }
  
  scene.upgrades--
  playerConfig.upgradeCount++
  console.log('TEST', playerConfig)
}
