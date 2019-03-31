import { addPatrol } from '../enemies'

export default class Level1 {
  constructor() {
    this.number = 1
    this.enemySpawnRate = 2500
  }

  spawnEnemies(scene) {
    addPatrol(scene, 1)
  }
}
