export const killOffScreen = sprite => {
  if(sprite.y >= 700 || sprite.y <= -200 || sprite.x >= 900 || sprite.x <= -100) {
    sprite.destroy()
  }
}
