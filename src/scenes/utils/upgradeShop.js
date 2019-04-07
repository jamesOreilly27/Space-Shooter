import { UpgradeContainer } from '../../UI'

export const addRectangle = (scene, x, y, highlighted) => {
  return new UpgradeContainer({ scene: scene, x: x, y: y, width: 216, height: 300, fillColor: 0x000036, alpha: .8, highlighted: highlighted })
}
