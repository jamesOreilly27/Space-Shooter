import { genRandNum } from './enemies.js'

//Helper that returns true if no powerups are on screen
const noPowerupOnScreen = scene => !scene.powerups.children.entries.length

//Helper that returns true 20% of the time if no power ups are on screen
const shouldDrop = scene => genRandNum(1000) < 200 && noPowerupOnScreen(scene)

