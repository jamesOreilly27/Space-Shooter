import { addMultiplePatrol } from '../enemies'

export default class Level1 {
  constructor() {
    this.enemySpawnRate = 2500
  }

  spawnEnemies(scene) {
    addMultiplePatrol(scene, 2)
  }
}
