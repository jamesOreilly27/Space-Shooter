import { Meteor } from '../sprites'

/***** Spawn Meteors *****/

export const createMeteor = (scene) => {
  scene.meteors.add(new Meteor({ scene: scene, x: 400, y: 300, key: 'med-meteor' }))
}
export const spawnMeteors = scene => {
  if(scene.score < scene.nextMeteorSpawn) { return }
  createMeteor(scene)
  scene.nextMeteorSpawn = scene.score + scene.meteorSpawnRate
}
