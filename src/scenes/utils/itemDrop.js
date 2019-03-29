import { genRandNum } from './enemies.js'

//Helper that returns true if no powerups are on screen
const noPowerupOnScreen = scene => !scene.powerups.children.entries.length
