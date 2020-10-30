import Entity from './Entity';

export default class Player extends Entity {
    constructor (scene, x, y, key) {
      super(scene, x, y, key, 'Player');
      this.setData('speed', 200);
      this.setData('shotRate', true);
      this.setData('health', 3);
      this.play('ship');
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