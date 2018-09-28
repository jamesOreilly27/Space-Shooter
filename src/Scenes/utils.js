export const addCollider = (scene, group1, group2, callback) => {
  scene.physics.add.collider(group1, group2, callback, null, scene)
}

export const destroy = (object1, object2) => {
  object1.disableBody(true, true)
  object2.disableBody(true, true)
} 