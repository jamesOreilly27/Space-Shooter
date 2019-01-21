import { PatrolShip, Divebomber } from '../../sprites'
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