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
  if(playerLaser.key === 'player-laser2'  && player.isLaserMaxed()) {
    enemyLaser.updateScore()
    enemyLaser.destroy()
    playerLaser.body.setVelocityY(-600)
    console.log('FIRING1')
  }
  else if(playerLaser.key !== 'player-laser' && playerLaser.key !== 'player-laser2' && playerLaser.visible){
    enemyLaser.updateScore()
    enemyLaser.destroy()
    console.log('FIRING2')
  }
}

export const getPowerup = (player, powerup) => {
  powerup.handleCollision()
  powerup.destroy()
}
