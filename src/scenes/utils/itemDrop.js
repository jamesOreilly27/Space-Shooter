import { genRandNum } from './enemies.js'

//Helper that takes a number a floor and a cieling as arguments
//returns true if the number falls between the floor and cieling, bottom inclusive
export const checkRange = (number, floor, cieling) => number >= floor && number < cieling

//Helper that returns true if no powerups are on screen
export const noPowerupOnScreen = scene => !scene.powerups.children.entries.length

//Helper that returns true 20% of the time if no power ups are on screen
export const shouldDrop = scene => genRandNum(1000) < 200 && noPowerupOnScreen(scene)

//Helper that returns true if the player's shield can upgrade
export const canUpgradeShield = shieldLevel => shieldLevel < 3

//Helper that determines which ShieldPowerup sprite to render
export const getShieldPowerupSprite = player => {
  if(player.shieldLevel === 0) return 'bronze-shield'
  else if(player.shieldLevel === 1) return 'silver-shield'
  else return 'gold-shield'
}

//Helper function that generates shield powerup and bomb powerup at a 2:1 rate
export const choosePowerup = ship => {
  const randNum = genRandNum(900)
  const shieldLevel = ship.scene.player.shieldLevel
  if(checkRange(randNum, 300, 900) && canUpgradeShield(shieldLevel)) { ship.dropShield()}
  else { ship.dropBomb() }
}
