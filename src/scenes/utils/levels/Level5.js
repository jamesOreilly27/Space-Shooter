import { genRandNum, addMultiplePatrol, addDivebombers, addFighter, addChaser } from '../enemies'
import { checkRange } from '../itemDrop'

class Level5 {
  constructor() {
    this.number = 5
    this.enemySpawnRate = 2300
  }

  spawnEnemies(scene, time) {
    if(time < scene.nextEnemySpawn) { return }
    const randNum = genRandNum(2000)
    if(randNum < 200) { addChaser(scene) }
    else if(checkRange(randNum, 200, 1000)) { addMultiplePatrol(scene, 3) }
    else if(checkRange(randNum, 1000, 1500)) { addFighter(scene) }
    else { addDivebombers(scene, 3) }
    scene.nextEnemySpawn = time + this.enemySpawnRate
  }
}

export default new Level5()
