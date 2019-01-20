import Phaser from 'phaser'
import { LaserPowerup, ShieldPowerup } from '../sprites'

export default class Meteor extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key)
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
  }

  generateRandomPowerUp() {
    const randNum = Math.floor(Math.random() * 2)
    if(randNum === 0) return new LaserPowerup({ scene: this.scene, x: this.x, y: this.y, key: 'gun-upgrade' })
    if(randNum === 1) return new ShieldPowerup({ scene: this.scene, x: this.x, y: this.y, key: this.scene.player.getShieldPowerupSprite() })
  }

  //This function will take a meteor and amounts to move in both x and y
  //It will add a tween to the meteor that moves it to the x and y destinations, then destroy
  createMeteorTween(meteor, xMove, yMove) {
    this.scene.tweens.add({
      targets: meteor,
      props: {
        x: { value: meteor.x + xMove, ease: 'Power0' },
        y: { value: meteor.y + yMove, ease: 'Power0' }
      },
      duration: 150,
      onComplete: () => { meteor.destroy() }
    })
  }

  //Propel Fragments in different dirrections by adding a tween to each meteor-piece
  propelFragments() {
    let counter = 0
    this.scene.meteors.children.entries.forEach(meteor => {
      if(counter === 0) {
        this.createMeteorTween(meteor, 20, 20)
        counter++
      } 
      else if(counter === 1) {
        this.createMeteorTween(meteor, -20, 20)
        counter++
      } 
      else if(counter === 2) {
        this.createMeteorTween(meteor, -20, -20)
        counter++
      }
      else if(counter === 3) {
        this.createMeteorTween(meteor, 20, -20)
        counter = 0
      }
    })
  }

  //This Function will create fragments of the broken meteor, then add the tweens to each with the propelFragments function
  genereateFourFragments() {
    const initial = this.scene.time.now
    for(let i = 0; i < 4; i++) {
      this.scene.meteors.add(new Meteor({ scene: this.scene, x: this.x, y: this.y, key: 'meteor-piece' }))
    }
    this.propelFragments()
  }

  //This function runs when the meteor is hit with a players laser
  /*It 
    *drops a random powerup
    *creates 4 meteor fragments
    *adds a tween to each fragment
    *destroys the original meteor
  */
  drop() {
    this.scene.powerups.add(this.generateRandomPowerUp())
    this.genereateFourFragments()
    this.destroy()
  }
}
