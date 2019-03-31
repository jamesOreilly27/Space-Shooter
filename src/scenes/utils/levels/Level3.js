import { addMultiplePatrol, addDivebombers, addFighters } from '../enemies'

export default class Level1 {
  constructor() {
    this.enemySpawnRate = 2500
  }

  spawnEnemies(scene) {
    const randNum = genRandNum(1000)
    if(randNum < 500) { addMultiplePatrol(scene, 2) }
    else if(randNum >= 500 && randNum < 800) { addFighter(scene) }
    else { addDivebombers(scene, 2) }
  }
}
