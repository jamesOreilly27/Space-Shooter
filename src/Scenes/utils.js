export const destroy = (object1, object2) => {
  object1.destroy()
  object2.destroy()
}

export const shieldBlock = (enemy, shield) => {
  shield.handleCollision()
  destroy(enemy, shield)
}

export const laserCollision = (playerLaser, enemyLaser) => {
  enemyLaser.destroy()
  playerLaser.body.setVelocityY(-600)
}

export const meteorDestroy = (laser, meteor) => {
  laser.destroy()
  meteor.drop()
}

export const randomCoordinateX = () => ( Math.floor(Math.random() * 800) )

export const randomCoordinateY = () => ( Math.floor(Math.random() * 300) )

export const powerup = (player, powerup) => {
  powerup.handleCollision()
  powerup.destroy()
}
