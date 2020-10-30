import Entity from './Entity';

export default class PlayerShot extends Entity {
  constructor(scene, x, y, dirX, dirY) {
    super(scene, x, y, 'player_shot');
    this.body.setVelocity(dirX, dirY);
  }
}