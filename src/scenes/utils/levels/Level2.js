import { addMultiplePatrol } from '../enemies'

export default class Level1 {
  constructor() {
    this.number = 2
    this.enemySpawnRate = 2500
  }

  spawnEnemies(scene) {
    addMultiplePatrol(scene, 2)
  }
}
