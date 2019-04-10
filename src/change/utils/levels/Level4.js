import { genRandNum, addMultiplePatrol, addDivebombers, addFighter } from '../enemies'

class Level4 {
  constructor() {
    this.number = 4
    this.enemySpawnRate = 2300
  }

  spawnEnemies(scene, time) {
    if(time < scene.nextEnemySpawn) { return }
    const randNum = genRandNum(1000)
    if(randNum < 500) { addMultiplePatrol(scene, 2) }
    else if(randNum >= 500 && randNum < 800) { addFighter(scene) }
    else { addDivebombers(scene, 2) }
    scene.nextEnemySpawn = time + this.enemySpawnRate
  }
}

export default new Level4()
