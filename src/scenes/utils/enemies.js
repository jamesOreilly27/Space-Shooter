import Phaser from 'phaser'
import { PatrolShip, Divebomber, Chaser, Fighter } from '../../sprites'

/*************** Enemy Stats ***************/

/***** Base Stats ******/
const baseStats = {
  Fighter: {
    speed: 1/135000,
    fireRate: 3000,
    bulletSpeed: 0
  },
  Divebomber: {
    speed: 180,
    fireRate: 0,
    bulletSpeed: 230.4
  },
  Patrol: {
    speed: 80,
    fireRate: 2000,
    bulletSpeed: 80
  },
  Chaser: {
    speed: 100,
    fireRate: 0,
    bulletSpeed: 0
  }
}
/***** Enemy Specs *****/
export const enemySpecs = {
  Fighter: {
    speed: baseStats.Fighter.speed,
    fireRate: baseStats.Fighter.fireRate,
    bulletSpeed: baseStats.Fighter.bulletSpeed
  },
  Divebomber: {
    speed: baseStats.Divebomber.speed,
    fireRate: baseStats.Divebomber.fireRate,
    bulletSpeed: baseStats.Divebomber.bulletSpeed
  },
  Patrol: {
    speed: baseStats.Patrol.speed,
    fireRate: baseStats.Patrol.fireRate,
    bulletSpeed: baseStats.Patrol.bulletSpeed
  },
  Chaser: {
    speed: baseStats.Chaser.speed,
    fireRate: baseStats.Patrol.fireRate,
    bulletSpeed: baseStats.Patrol.bulletSpeed
  }
}

export const resetEnemySpecs = () => {
  for(let enemyClass in enemySpecs) {
    enemySpecs[enemyClass].speed = baseStats[enemyClass].speed
    enemySpecs[enemyClass].fireRate = baseStats[enemyClass].fireRate
    enemySpecs[enemyClass].bulletSpeed = baseStats[enemyClass].bulletSpeed
  }
}

export const incrementEnemySpecs = () => {
  for(let enemyClass in enemySpecs) {
    if(enemyClass === 'Chaser') {
      enemySpecs[enemyClass].speed *= 1.08
    }
    else {
      enemySpecs[enemyClass].speed *= 1.1
      enemySpecs[enemyClass].fireRate *= .9
      enemySpecs[enemyClass].bulletSpeed *= 1.1
    }
  }
}

/*************** Spawning Enemies ***************/
export const randomCoordinateX = () => ( Math.floor(Math.random() * 600) )

export const randomCoordinateY = () => ( Math.floor(Math.random() * 300) )

export const addEnemy = (scene, enemyClass, key, x, y, path) => {
  scene.enemies.add(new enemyClass({ scene, key, x, y, path}))
}

//Add Patrol ships in quantities up to 3 ships
export const addPatrol = (scene, quantity) => {
  const randomX = randomCoordinateX()
  for(let i = 0; i < quantity; i++) {
    addEnemy(scene, PatrolShip, 'patrol-ship', randomX + (35 * i), 20)
  }
}

export const addDivebombers = (scene, quantity) => {
  const randomX = randomCoordinateX()
  for(let i = 0; i < quantity; i++) {
    addEnemy(scene, Divebomber, 'divebomber', randomX + (20 * i), (-20 - (30 * i)))
  }
}

export const addChaser = scene => {
  addEnemy(scene, Chaser, 'chaser', scene.player.x, 600)
}

export const addFighter = scene => {
  const randomX = randomCoordinateX()
  const path = new Phaser.Curves.Path(randomX, 75)
  for(let i = 0; i < 100; i ++) {
    if(i % 4 === 0) {
      path.splineTo([randomX + 100, 125])
    }
    else if(i % 4 === 1) {
      path.splineTo([randomX + 200, 75])
    }
    else if( i % 4 === 2) {
      path.splineTo([randomX + 100, 75])
    }
    else if( i % 4 === 3) {
      path.splineTo([randomX, 75])
    }
  }
  path.lineTo(randomX, 650)

  addEnemy(scene, Fighter, 'fighter', randomX, 100, path)
}

export const addRandomEnemy = scene => {
  const randNum = Math.floor(Math.random() * 3)
  if(randNum === 0) addPatrol(scene, 3)
  else if(randNum === 1) addDivebombers(scene, 3)
  else addChaser(scene)
}

export const spawnEnemies = (scene, time) => {
  if(time < scene.nextEnemySpawn) { return }
    // addFighter(scene)
    addFighter(scene)
    addFighter(scene)
    // addPatrol(scene, 2)
    // addDivebombers(scene, 3)
    // addRandomEnemy(scene)
    scene.nextEnemySpawn = time + scene.enemySpawnRate
}
