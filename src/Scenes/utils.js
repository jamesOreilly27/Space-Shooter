const images = [
  { key: 'player', path: 'playerShip1_green' },
  { key: 'player-laser', path: 'laserGreen03' },
  { key: 'player-laser2', path: 'laserGreen10' },
  { key: 'patrol-ship-laser', path: 'laserRed10' },
  { key: 'patrol-ship', path: 'enemyRed1' },
  { key: 'divebomber', path: 'enemyRed4' },
  { key: 'divebomber-laser', path: 'laserRed14' },
  { key: 'chaser', path: 'enemyBlack2' },
  { key: 'bronze-shield', path: 'shield_bronze' },
  { key: 'silver-shield', path: 'shield_silver' },
  { key: 'gold-shield', path: 'shield_gold' },
  { key: 'shield1', path: 'shield1' },
  { key: 'shield2', path: 'shield2' },
  { key: 'shield3', path: 'shield3' },
  { key: 'gun-upgrade', path: 'gun10' },
  { key: 'big-meteor', path: 'meteorBrown_big1' },
  { key: 'med-meteor', path: 'meteorBrown_med3' },
  { key: 'meteor-piece', path: 'meteorBrown_tiny1' }
]


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

export const imageLoad = (scene, key, path) => {
  scene.load.image(key, `./assets/${path}.png`)
}

export const battlefieldImageLoad = scene => {
  images.forEach(image => {
    imageLoad(scene, image.key, image.path)
  })
}
