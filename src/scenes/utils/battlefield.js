import { Level2, Level3, Level4, Level5, Level6, Level7, Level8, Level9, Level10 } from './levels'

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
  { key: 'fighter-laser', path: 'laserRed13' },
  { key: 'bronze-shield', path: 'shield_bronze' },
  { key: 'silver-shield', path: 'shield_silver' },
  { key: 'gold-shield', path: 'shield_gold' },
  { key: 'shield1', path: 'shield1' },
  { key: 'shield2', path: 'shield2' },
  { key: 'shield3', path: 'shield3' },
  { key: 'gun-upgrade', path: 'gun10' },
  { key: 'bomb', path: 'ufoGreen' }
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
  battlefield.levelText.setText(`LEVEL: ${battlefield.level.number}`)
}

export const increaseEnemySpawnRate = battlefield => { battlefield.enemySpawnRate = 2000 }

export const incrementLevel = battlefield => {
  if(battlefield.score >= 300  && battlefield.score < 750) {
    battlefield.level = Level2
    incrementLevelText(battlefield)
  }
  if(battlefield.score >= 750 && battlefield.score < 1875) {
    battlefield.level = Level3
    incrementLevelText(battlefield)
  }
  if(battlefield.score >= 1875 && battlefield.score < 4687) {
    battlefield.level = Level4
    incrementLevelText(battlefield)
    increaseEnemySpawnRate(battlefield)
  }
  if(battlefield.score >= 4687 && battlefield.score < 11716) {
    battlefield.level = Level5
    incrementLevelText(battlefield)
  }
  if(battlefield.score >= 11716 && battlefield.score < 20658) {
    battlefield.level = Level6
    incrementLevelText(battlefield)
  }
  if(battlefield.score >= 20658 && battlefield.score < 25354) {
    battlefield.level = Level7
    incrementLevelText(battlefield)
  }
  if(battlefield.score >= 25354 && battlefield.score < 30968) {
    battlefield.level = Level8
    incrementLevelText(battlefield)
  }
  if(battlefield.score >= 30968 && battlefield.score < 35722) {
    battlefield.level = Level9
    incrementLevelText(battlefield)
  }
  if(battlefield.score >= 35722) {
    battlefield.level = Level10
    incrementLevelText(battlefield)
  }
}
