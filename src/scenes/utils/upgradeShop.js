import { UpgradeContainer, UpgradeButton } from '../../UI'

export const addRectangle = (scene, x, y, highlighted) => {
  return new UpgradeContainer({ scene: scene, x: x, y: y, width: 216, height: 300, fillColor: 0x000036, alpha: .8, highlighted: highlighted })
}

export const addUpgradeButton = (scene, x, y) => { return new UpgradeButton({ scene: scene, x: x, y: y, key: 'upgrade-btn'}) }

export const addUpgradeText = (scene, x, y) => {
  scene.add.text(x, y, 'UPGRADE', { fontSize: '12px', fontFamily: 'Lato', fill: '#0A0A0A' })
}
