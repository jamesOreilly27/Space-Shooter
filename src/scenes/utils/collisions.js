export const destroy = (object1, object2) => {
  object1.destroy()
  object2.destroy()
}

export const enemyDestroy = (ship, laser) => {
  ship.enemyExplode()
  laser.destroy()
}

export const playerDestroy = (player, enemyLaser) => {
  player.playerExplode()
  enemyLaser.destroy()
}

export const shieldBlock = (enemy, shield) => {
  shield.handleCollision()
  destroy(enemy, shield)
}

export const laserCollision = (playerLaser, enemyLaser) => {
  enemyLaser.destroy()
  playerLaser.body.setVelocityY(-600)
}

export const powerup = (player, powerup) => {
  powerup.handleCollision()
  powerup.destroy()
}
