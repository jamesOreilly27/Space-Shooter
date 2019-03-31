import { genRandNum, addMultiplePatrol, addDivebombers, addFighter } from '../enemies'

class Level3 {
  constructor() {
    this.number = 3
    this.enemySpawnRate = 2500
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

export default new Level3()
