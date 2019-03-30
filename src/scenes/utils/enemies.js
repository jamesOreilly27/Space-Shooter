import Phaser from 'phaser'
import { PatrolShip, Divebomber, Chaser, Fighter } from '../../sprites'

/*************** Enemy Stats ***************/

/***** Base Stats ******/
//This object acts as a place holder for the stats that each enemy class starts the game with
const baseStats = {
  Fighter: { speed: 1/135000, fireRate: 3000, bulletSpeed: 0 },
  Divebomber: { speed: 180, fireRate: 0, bulletSpeed: 230.4 },
  Patrol: { speed: 80, fireRate: 2000, bulletSpeed: 80 },
  Chaser: { speed: 100, fireRate: 0, bulletSpeed: 0 }
}

/***** Enemy Specs *****/
//This object holds is initialized with values from the base stats object. It is updated as the game levels up
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

//resets enemySpecs object to the base stats. Will be used when the player starts a new game from the Death scene
export const resetEnemySpecs = () => {
  for(let enemyClass in enemySpecs) {
    enemySpecs[enemyClass].speed = baseStats[enemyClass].speed
    enemySpecs[enemyClass].fireRate = baseStats[enemyClass].fireRate
    enemySpecs[enemyClass].bulletSpeed = baseStats[enemyClass].bulletSpeed
  }
}

//increments enemySpecs. Will run whenever the game level increments.
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

/************************* Spawning Enemies *************************/

export const baseSpawnRate = 2500
export const resetEnemySpawnRate = scene => { scene.enemySpawnRate = baseSpawnRate }

/***** Random Coordinate Generators ******/
export const randomCoordinateX = () => ( Math.floor(Math.random() * 600) )
export const randomCoordinateY = () => ( Math.floor(Math.random() * 300) )

export const genRandNum = max => { return Math.floor(Math.random() * max) }

//Helper function that takes a scene and an enemy object as arguments
//Adds an enemy with the properties specified in enemy object to the scene
export const addEnemy = (scene, enemy) => {
  scene.enemies.add(new enemy.class({ scene, key: enemy.key, x: enemy.x, y: enemy.y, path: enemy.path, left: enemy.left }))
}

//Add Patrol ships in quantities up to 3 ships
export const addPatrol = (scene, quantity) => {
  const randomX = randomCoordinateX()
  for(let i = 0; i < quantity; i++) {
    addEnemy(scene, { class: PatrolShip, key: 'patrol-ship', x: randomX + (35 * i), y: 20 })
  }
}

export const addMultiplePatrol = (scene, quantity) => {
  for(let i = 0; i < quantity; i++) { addPatrol(scene, 1) }
}

//Helper determines if xCoordinate is on left side of screen or not
export const isLeft = (enemyX, playerX) => enemyX <= playerX

//Helper determines which way divebombers squadrons will form up
export const stepDivebombers = (scene, quantity, x, isLeft) => {
  if(!isLeft) {
    for(let i = 0; i < quantity; i++) {
      addEnemy(scene, { class: Divebomber, key: 'divebomber', x: x + (20 * i), y: (-20 - (30 * i)), left: false })
    }
  }
  else {
    for(let i = 0; i > -quantity; i--) {
      addEnemy(scene, { class: Divebomber, key: 'divebomber', x: x + (20 * i), y: (-20 + (30 * i)), left: true })
    }
  }
}

export const addDivebombers = (scene, quantity) => {
  const randomX = randomCoordinateX()
  stepDivebombers(scene, quantity, randomX, isLeft(randomX, scene.player.x), )
}

export const addChaser = scene => addEnemy(scene, { class: Chaser, key: 'chaser', x: scene.player.x, y: 600 })

export const addFighter = scene => {
  const randomX = randomCoordinateX()
  const path = new Phaser.Curves.Path(randomX, 75)
  for(let i = 0; i < 100; i ++) {
    if(i % 4 === 0) { path.splineTo([randomX + 100, 125]) }
    else if(i % 4 === 1) { path.splineTo([randomX + 200, 75]) }
    else if( i % 4 === 2) { path.splineTo([randomX + 100, 75]) }
    else if( i % 4 === 3) { path.splineTo([randomX, 75])}
  }
  path.lineTo(randomX, 650)

  addEnemy(scene, { class: Fighter, key: 'fighter', x: randomX, y: 100, path: path })
}

/***** Enemy Spawn Helper Functions by Level *****/
export const levelOneSpawn = scene => { addPatrol(scene, 1) }
export const levelTwoSpawn = scene => { addMultiplePatrol(scene, 2) }

export const levelThreeSpawn = scene => {
  const randNum = genRandNum(1000)
  if(randNum < 500) { addMultiplePatrol(scene, 2) }
  else if(randNum >= 500 && randNum < 800) { addFighter(scene) }
  else { addDivebombers(scene, 2) }
}

export const levelFiveSpawn = scene => {
  const randNum = genRandNum(2000)
  if(randNum <= 300) { addChaser(scene) }
  else if(randNum > 300 && randNum <= 1000) { addMultiplePatrol(scene, 3) }
  else if(randNum > 1000 && randNum <= 1500) { addFighter(scene) }
  else { addDiveBombers(scene, 3) }
}

export const addRandomEnemy = scene => {
  if(scene.level === 1) levelOneSpawn(scene)
  if(scene.level === 2) levelTwoSpawn(scene)
  if(scene.level === 3 || scene.level === 4) levelThreeSpawn(scene)
  if(scene.level === 5) levelFiveSpawn(scene)

}

export const spawnEnemies = (scene, time) => {
  if(time < scene.nextEnemySpawn) { return }
  // addRandomEnemy(scene)
  addDivebombers(scene, 3)
  scene.nextEnemySpawn = time + scene.enemySpawnRate
}
