export const destroy = (object1, object2) => {
  object1.disableBody(true, true)
  object2.disableBody(true, true)
}

export const randomCoordinateX = () => ( Math.floor(Math.random() * 800) )

export const randomCoordinateY = () => ( Math.floor(Math.random() * 300) )
