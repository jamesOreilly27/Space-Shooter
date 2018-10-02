export const killOffScreen = sprite => {
  if(sprite.y >= 610 || sprite.y <= -10 || sprite.x >= 810 || sprite.x <= -10) {
    sprite.destroy()
  }
}
