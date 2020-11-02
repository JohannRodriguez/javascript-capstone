import Entity from './Entity';
import PlayerShot from '../Entities/PlayerShot';

export default class Player extends Entity {
    constructor (scene, x, y, key) {
      super(scene, x, y, key, 'player');
      this.setData('speed', 300);
      this.setData('shotSpeed', 450);
      this.setData('shotRate', true);
      this.setData('health', 3);
      this.setData('inmune', false);
      this.setData('score', 0);
      this.play('playerIdle');
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
      this.anims.play('playerBack', true);
    }
  
    moveDown() {
      this.body.velocity.y = this.getData('speed');
      this.anims.play('playerFront', true);
    }
  
    moveLeft() {
      this.body.velocity.x = -this.getData('speed');
      this.anims.play('playerLeft', true);
    }
  
    moveRight() {
      this.body.velocity.x = this.getData('speed');
      this.anims.play('playerRight', true);
    }

    shotAction(scene, group, dirX, dirY) {
      group.add(new PlayerShot(
        scene,
        this.x,
        this.y,
        dirX,
        dirY,
      ));
      this.setData('shotRate', false);
    }
  
    update () {
      this.body.setVelocity(0, 0);
      this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
      this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);
    }
  }