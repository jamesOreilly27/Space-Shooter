import { addMultiplePatrol } from '../enemies'

class Level2 {
  constructor() {
    this.number = 2
    this.enemySpawnRate = 2500
  }

  spawnEnemies(scene, time) {
    if(time < scene.nextEnemySpawn) { return }
    addMultiplePatrol(scene, 2)
    scene.nextEnemySpawn = time + this.enemySpawnRate
  }
}

export default new Level2()
