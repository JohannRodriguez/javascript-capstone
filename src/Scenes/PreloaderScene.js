import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }

  init () {
    this.readyCount = 0;
  }

  preload () {
    // display progress bar
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    // remove progress bar when complete
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    }.bind(this));

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.spritesheet('enemy_1', '/src/assets/ui/enemy_1.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('enemy_2', '/src/assets/ui/enemy_2.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('enemy_3', '/src/assets/ui/enemy_3.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('player', '/src/assets/ui/player.png', {
      frameWidth: 31,
      frameHeight: 32,
    });

    this.load.image('background', '/src/assets/ui/background.png');
    this.load.image('bar_top', '/src/assets/ui/barrier_top.png');
    this.load.image('bar_bot', '/src/assets/ui/barrier_bot.png');
    this.load.image('bar_side', '/src/assets/ui/barrier_side.png');
    this.load.image('p_shot', '/src/assets/ui/player_bullet.png');
    this.load.image('en1_shot', '/src/assets/ui/enemy1_bullet.png');
    this.load.image('en3_shot', '/src/assets/ui/enemy2_bullet.png');
    this.load.image('shield', '/src/assets/ui/Shield.png');
    this.load.image('upBtn', '/src/assets/ui/up_btn.png');
    this.load.image('downBtn', '/src/assets/ui/down_btn.png');


    this.load.image('blueButton1', '/src/assets/ui/blue_button02.png');
    this.load.image('blueButton2', '/src/assets/ui/blue_button03.png');
    this.load.image('phaserLogo', '/src/assets/logo.png');
    this.load.image('box', '/src/assets/ui/grey_box.png');
    this.load.image('checkedBox', '/src/assets/ui/blue_boxCheckmark.png');
    this.load.image('ship', '/src/assets/ui/ship.png');
    this.load.image('player_shot', '/src/assets/ui/player_shot.png');
    this.load.image('e_shot', '/src/assets/ui/enemy_shot.png');
    this.load.audio('bgMusic', ['/src/assets/TownTheme.mp3']);
  }

  create () {
    this.anims.create({
      key: 'playerIdle',
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 0,
      }),
      frameRate: 0,
      repeat: 0,
    });
    this.anims.create({
      key: 'playerFront',
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'playerLeft',
      frames: this.anims.generateFrameNumbers('player', {
        start: 4,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'playerRight',
      frames: this.anims.generateFrameNumbers('player', {
        start: 8,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'playerBack',
      frames: this.anims.generateFrameNumbers('player', {
        start: 12,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'playerDamage',
      frames: this.anims.generateFrameNumbers('player', {
        start: 16,
        end: 16,
      }),
      frameRate: 0,
      repeat: 0,
    });

    this.anims.create({
      key: 'en1Flight',
      frames: this.anims.generateFrameNumbers('enemy_1', {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'en1Shot',
      frames: this.anims.generateFrameNumbers('enemy_1', {
        start: 6,
        end: 11,
      }),
      frameRate: 4.3,
      repeat: 0,
    });
    this.anims.create({
      key: 'en1Spawn',
      frames: this.anims.generateFrameNumbers('enemy_1', {
        start: 12,
        end: 15,
      }),
      frameRate: 4.5,
      repeat: 0,
    });

    this.anims.create( {
      key: 'en2right',
      frames: this.anims.generateFrameNumbers('enemy_2', {
        start: 0,
        end: 7,
      }),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create( {
      key: 'en2left',
      frames: this.anims.generateFrameNumbers('enemy_2', {
        start: 8,
        end: 15,
      }),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create( {
      key: 'en2IdleRight',
      frames: this.anims.generateFrameNumbers('enemy_2', {
        start: 16,
        end: 19,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create( {
      key: 'en2IdleLeft',
      frames: this.anims.generateFrameNumbers('enemy_2', {
        start: 20,
        end: 23,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'en3IdleFront',
      frames: this.anims.generateFrameNumbers('enemy_3', {
        start: 0,
        end: 0,
      }),
      frameRate: 0,
      repeat: 0,
    });    
    this.anims.create({
      key: 'en3IdleBack',
      frames: this.anims.generateFrameNumbers('enemy_3', {
        start: 1,
        end: 1,
      }),
      frameRate: 1,
      repeat: 0,
    });
    this.anims.create({
      key: 'en3ShotFront',
      frames: this.anims.generateFrameNumbers('enemy_3', {
        start: 2,
        end: 4,
      }),
      frameRate: 3.1,
      repeat: 0,
    });
    this.anims.create({
      key: 'en3ShotBack',
      frames: this.anims.generateFrameNumbers('enemy_3', {
        start: 5,
        end: 7,
      }),
      frameRate: 3.1,
      repeat: 0,
    });
    this.anims.create({
      key: 'en3Spawn',
      frames: this.anims.generateFrameNumbers('enemy_3', {
        start: 7,
        end: 10,
      }),
      frameRate: 2,
      repeat: 0,
    });
  }

  ready () {
    this.scene.start('Title');
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
};
