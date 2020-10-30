import Entity from './Entity';

export default class Player extends Entity {
    constructor (scene, x, y, key) {
      super(scene, x, y, key, 'ship');
      this.setData('speed', 300);
      this.setData('shotSpeed', 450);
      this.setData('shotRate', true);
      this.setData('health', 3);
      this.setData('inmune', false);
      this.setData('score', 0);
    }

    score (keyPoint) {
      const currentScore = this.getData('score');
      const points = (keyPoint * 2)

      this.setData('score', (currentScore + points))
    }

    inmunityRst (time) {
      time.addEvent({
        delay: 1200,
        callback: () => {
          this.setData('inmune', false);
        }
      });
    }

    shootRate (time) {
      time.addEvent({
        delay: 500,
        callback: () => {
          this.setData('shotRate', true);
        },
      });
    }
  
    moveUp() {
      this.body.velocity.y = -this.getData('speed');
    }
  
    moveDown() {
      this.body.velocity.y = this.getData('speed');
    }
  
    moveLeft() {
      this.body.velocity.x = -this.getData('speed');
    }
  
    moveRight() {
      this.body.velocity.x = this.getData('speed');
    }
    
  
    update () {
      this.body.setVelocity(0, 0);
      this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
      this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);
    }
  }