/***** Preload Images Utils *****/

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
  { key: 'big-meteor', path: 'meteorBrown_big1' },
  { key: 'med-meteor', path: 'meteorBrown_med3' },
  { key: 'meteor-piece', path: 'meteorBrown_tiny1' },
  { key: 'fighter-laser', path: 'laserRed13' }
]

//image load will only load .png files from the assets folder
export const imageLoad = (scene, key, path) => {
  scene.load.image(key, `./assets/${path}.png`)
}

//Run imageLoad function for everything in the images array
//This function is exported to Battlefield scene and runs in the preload method
export const battlefieldImageLoad = scene => {
  images.forEach(image => {
    imageLoad(scene, image.key, image.path)
  })
}
