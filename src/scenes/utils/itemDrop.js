import { genRandNum } from './enemies.js'

//Helper that takes a number a floor and a cieling as arguments
//returns true if the number falls between the floor and cieling, bottom inclusive
const checkRange = (number, floor, cieling) => number >= floor && number < cieling

//Helper that returns true if no powerups are on screen
const noPowerupOnScreen = scene => !scene.powerups.children.entries.length

//Helper that returns true 20% of the time if no power ups are on screen
const shouldDrop = scene => genRandNum(1000) < 200 && noPowerupOnScreen(scene)

//Helper that returns true if the player's shield can upgrade
const canUpgradeShield = shieldLevel => shieldLevel < 3
