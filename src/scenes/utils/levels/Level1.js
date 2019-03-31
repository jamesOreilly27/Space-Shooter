import { addPatrol } from '../enemies'

class Level1 {
  constructor() {
    this.number = 1
    this.enemySpawnRate = 2500
  }

  spawnEnemies(scene, time) {
    if(time < scene.nextEnemySpawn) { return }
    addPatrol(scene, 1)
    scene.nextEnemySpawn = time + this.enemySpawnRate
  }
}

export default new Level1()
