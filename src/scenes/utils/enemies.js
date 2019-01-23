import Phaser from 'phaser'
import { PatrolShip, Divebomber, Chaser, Fighter } from '../../sprites'

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
    addFighter(scene)
    addDivebombers(scene, 5)
    addRandomEnemy(scene)
    scene.nextEnemySpawn = time + scene.enemySpawnRate
}
