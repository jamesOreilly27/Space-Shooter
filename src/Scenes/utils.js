export const destroy = (object1, object2) => {
  console.log(object1)
  object1.disableBody(true, true)
  object2.disableBody(true, true)
}