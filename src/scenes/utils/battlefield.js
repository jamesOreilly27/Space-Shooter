/*************** Preload Images ***************/

//Add any images needed for the game to this array and they will automatically be added to the preload function in the Battlefield Scene
const images = [
  { key: 'player', path: 'playerShip1_green' },
  { key: 'player-laser', path: 'laserGreen03' },
  { key: 'player-laser2', path: 'laserGreen10' },
  { key: 'patrol-ship-laser', path: 'laserRed10' },
  { key: 'patrol-ship', path: 'enemyRed1' },
  { key: 'divebomber', path: 'enemyRed4' },
  { key: 'divebomber-laser', path: 'laserRed14' },
  { key: 'chaser', path: 'enemyBlack2' },
  { key: 'fighter', path: 'enemyRed2'},
  { key: 'bronze-shield', path: 'shield_bronze' },
  { key: 'silver-shield', path: 'shield_silver' },
  { key: 'gold-shield', path: 'shield_gold' },
  { key: 'shield1', path: 'shield1' },
  { key: 'shield2', path: 'shield2' },
  { key: 'shield3', path: 'shield3' },
  { key: 'gun-upgrade', path: 'gun10' },
  { key: 'fighter-laser', path: 'laserRed13' }
]

//image load will only load .png files from the assets folder
export const imageLoad = (scene, key, path) => {
  scene.load.image(key, `./assets/${path}.png`)
}

//Run imageLoad function for everything in the images array
//This function is exported to Battlefield scene and runs in the preload method
export const battlefieldImageLoad = battlefield => {
  images.forEach(image => {
    imageLoad(battlefield, image.key, image.path)
  })
}

/*************** Incrementing Level ***************/
export const incrementLevelText = battlefield => {
  battlefield.levelText.setText(`LEVEL: ${battlefield.level}`)
}

export const increaseEnemySpawnRate = battlefield => {
  battlefield.enemySpawnRate = 2000
}

export const incrementLevel = battlefield => {
  if(battlefield.score === 300) {
    battlefield.level = 2
    incrementLevelText(battlefield)
  }
  if(battlefield.score >= 800 && battlefield.score < 2100) {
    battlefield.level = 3
    incrementLevelText(battlefield)
  }
  if(battlefield.score >= 2100) {
    battlefield.level = 4
    incrementLevelText(battlefield)
    increaseEnemySpawnRate(battlefield)
  }
  // if(battlefield.score >= 400 && battlefield.score <= 500) {
  //   battlefield.level = 5
  //   incrementLevelText(battlefield)
  // }
  // if(battlefield.score >= 501 && battlefield.score <= 600) {
  //   battlefield.level = 6
  //   incrementLevelText(battlefield)
  // }
  // if(battlefield.score >= 601 && battlefield.score <= 700) {
  //   battlefield.level = 7
  //   incrementLevelText(battlefield)
  // }
  // if(battlefield.score >= 701 && battlefield.score <= 800) {
  //   battlefield.level = 8
  //   incrementLevelText(battlefield)
  // }
  // if(battlefield.score >= 801 && battlefield.score <= 900) {
  //   battlefield.level = 9
  //   incrementLevelText(battlefield)
  // }
  // if(battlefield.score >= 901 && battlefield.score <= 1000) {
  //   battlefield.level = 10
  //   incrementLevelText(battlefield)
  // }
}
