import { PatrolShip, Divebomber, Chaser, Fighter } from '../../sprites'
export const randomCoordinateX = () => ( Math.floor(Math.random() * 800) )

export const randomCoordinateY = () => ( Math.floor(Math.random() * 300) )

export const addEnemy = (scene, enemyClass, key, x, y) => {
  scene.enemies.add(new enemyClass({ scene, key, x, y }))
}

//Add Patrol ships in quantities up to 3 ships
export const addPatrol = (scene, quantity) => {
  const randomX = randomCoordinateX()
  for(let i = 0; i < quantity; i++) {
    addEnemy(scene, PatrolShip, 'patrol-ship', randomX + (70 * i), 20)
  }
}

export const addDivebombers = (scene, quantity) => {
  const randomX = randomCoordinateX()
  for(let i = 0; i < quantity; i++) {
    addEnemy(scene, Divebomber, 'divebomber', randomX + (50 * i), (-20 - (60 * i)))
  }
}

export const addChaser = scene => {
  addEnemy(scene, Chaser, 'chaser', scene.player.x, 600)
}

export const addFighter = scene => {
  addEnemy(scene, Fighter, 'fighter', 450, 100)
}

export const addRandomEnemy = scene => {
  const randNum = Math.floor(Math.random() * 3)
  if(randNum === 0) addPatrol(scene, 1)
  else if(randNum === 1) addDivebombers(scene, 1)
  else addChaser(scene)
}
