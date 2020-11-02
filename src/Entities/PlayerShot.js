import Entity from './Entity';

export default class PlayerShot extends Entity {
  constructor(scene, x, y, dirX, dirY) {
    super(scene, x, y, 'p_shot');
    this.setScale(2, 2);
    this.body.setVelocity(dirX, dirY);
  }
}