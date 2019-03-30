export const destroy = (object1, object2) => {
  object1.destroy()
  object2.destroy()
}

export const enemyDestroy = (ship, laser) => {
  if(laser.key === 'player-laser') {
    ship.enemyExplode()
    laser.destroy()
  } 
  else if(laser.visible) {
    ship.enemyExplode()
  }
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
  const player = playerLaser.scene.player
  if(playerLaser.key === 'player-laser'  && player.isLaserMaxed()) {
    enemyLaser.destroy()
    playerLaser.body.setVelocityY(-600)
  }
  else if(playerLaser.key !== 'player-laser' && playerLaser.visible){
    enemyLaser.updateScore()
    enemyLaser.destroy()
  }
}

export const getPowerup = (player, powerup) => {
  powerup.handleCollision()
  powerup.destroy()
}
