export const killOffScreen = sprite => {
  if(sprite.y >= 630 || sprite.y <= -30 || sprite.x >= 830 || sprite.x <= -30) {
    sprite.destroy()
  }
}
