import { genRandNum, addMultiplePatrol, addDivebombers, addFighter, addChaser } from '../enemies'
import { checkRange } from '../itemDrop'

class Level6 {
  constructor() {
    this.number = 6
    this.enemySpawnRate = 2300
  }

  spawnEnemies(scene, time) {
    if(time < scene.nextEnemySpawn) { return }
    const randNum = genRandNum(2000)
    if(randNum < 300) { addChaser(scene) }
    else if(checkRange(randNum, 300, 800)) { addMultiplePatrol(scene, 3) }
    else if(checkRange(randNum, 800, 1500)) { addDivebombers(scene, 3) }
    else { addFighter(scene) }
    scene.nextEnemySpawn = time + this.enemySpawnRate
  }
}

export default new Level6()
