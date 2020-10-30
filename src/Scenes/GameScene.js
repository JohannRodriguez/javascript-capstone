import 'phaser';
import Player from '../Entities/Player';
import PlayerShot from '../Entities/PlayerShot';
import Enemy1 from '../Entities/Enemy1';
import EnemyShot from '../Entities/EnemyShot';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  preload () {
  }

  playerAccions () {
    if (this.keyW.isDown) {
      this.player.moveUp();
    }
    else if (this.keyS.isDown) {
      this.player.moveDown();
    }

    if (this.keyA.isDown) {
      this.player.moveLeft();
    }
    else if (this.keyD.isDown) {
      this.player.moveRight();
    }

    if (this.player.getData('shotRate') === true) {
      if (this.shootKeys.up.isDown) {
        this.playerShots.add(new PlayerShot(
          this,
          this.player.x,
          this.player.y,
          0,
          -300
        ));
        this.player.setData('shotRate', false);
        this.player.shootRate(this.time);
      } else if (this.shootKeys.down.isDown) {
        this.playerShots.add(new PlayerShot(
          this,
          this.player.x,
          this.player.y,
          0,
          300
        ));
        this.player.setData('shotRate', false);
        this.player.shootRate(this.time);
      } else if (this.shootKeys.right.isDown) {
        this.playerShots.add(new PlayerShot(
          this,
          this.player.x,
          this.player.y,
          300,
          0
        ));
        this.player.setData('shotRate', false);
        this.player.shootRate(this.time);
      } else if (this.shootKeys.left.isDown) {
        this.playerShots.add(new PlayerShot(
          this,
          this.player.x,
          this.player.y,
          -300,
          0
        ));
        this.player.setData('shotRate', false);
        this.player.shootRate(this.time);
      }
    }
  }

  damage (player, bullet) {
    bullet.destroy();
    const playerHealth = player.getData('health');
    player.setData('health', (playerHealth - 1));
    if (player.getData('health') === 0) {
      player.setData('isDead', true);
    }
    console.log(player.getData('health'));
    console.log(player.getData('isDead'));

  }

  create () {
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'ship'
    );
    this.playerShots = this.add.group();

    this.enemies1 = this.add.group();
    this.enemyShots = this.add.group();

    this.enemy = new Enemy1(this, 30, 200);
    this.enemy2 = new Enemy1(this, 100, 200);
    this.enemySample = this.enemies1.add(this.enemy);
    this.enemySample2 = this.enemies1.add(this.enemy2);

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.shootKeys = this.input.keyboard.createCursorKeys();

    this.physics.add.overlap(this.player, this.enemyShots, this.damage, null, this);
  }

  update () {
    this.enemies1.children.iterate(enemy1 => {
      if (enemy1.getData('shotRate')) {
        const shotSpeed = enemy1.getData('shotSpeed');
        enemy1.body.setVelocity(0, 0);
        enemy1.shotRate(this.time);
        this.time.addEvent({
          delay: 500,
          callback: () => {
            this.enemyShots.add(new EnemyShot(this, enemy1.x, enemy1.y, 'e_shot', 0, shotSpeed));
            this.enemyShots.add(new EnemyShot(this, enemy1.x, enemy1.y, 'e_shot', 0, -shotSpeed));
            this.enemyShots.add(new EnemyShot(this, enemy1.x, enemy1.y, 'e_shot', shotSpeed, 0));
            this.enemyShots.add(new EnemyShot(this, enemy1.x, enemy1.y, 'e_shot', -shotSpeed, 0));
          }
        });
        enemy1.setData('shotRate', false);
      }
    })

    this.player.update();

    this.playerAccions();
  }
};