import { genRandNum, addMultiplePatrol, addDivebombers, addFighter, addChaser } from '../enemies'
import { checkRange } from '../itemDrop'

class Level10 {
  constructor() {
    this.number = 10
    this.enemySpawnRate = 1700
  }

  addEnemies(scene) {
    const randNum = genRandNum(2000)
    if(randNum < 400) { addChaser(scene) }
    else if(checkRange(randNum, 400, 900)) { addMultiplePatrol(scene, 4) }
    else if(checkRange(randNum, 900, 1500)) { addDivebombers(scene, 4) }
    else {
      addFighter(scene)
      addFighter(scene)
    }
  }

  spawnEnemies(scene, time) {
    if(time < scene.nextEnemySpawn) { return }
    this.addEnemies(scene)
    this.addEnemies(scene)
    scene.nextEnemySpawn = time + this.enemySpawnRate
  }
}

export default new Level10()
