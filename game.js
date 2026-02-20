export class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

  preload() {
    this.load.image('track', 'assets/Background.png');
    this.load.image('barrier', 'assets/barrier_3.png');
    this.load.image('margin', 'assets/margin.png');
    this.load.image('car', 'assets/car/car0.png');
    this.load.image('enemy', 'assets/car/enemy0.png');
    this.load.image('coin', 'assets/coin.png');
    
    for (let i = 1; i <= 5; i++) {
      this.load.image(`burst${i}`, `assets/burst/${i}.png`);
    }
  }

  create() {
    const track = this.add.image(0, 0, 'track').setOrigin(0);
    this.barrier = this.add.image(0, 0, 'barrier').setOrigin(0).setVisible(false);
    this.add.image(0, 0, 'margin').setOrigin(0).setDepth(20);

    this.player = this.physics.add.sprite(920, 800, 'car').setScale(0.6);
    this.rival = this.physics.add.sprite(920, 750, 'enemy').setScale(0.6);

    this.coins = this.physics.add.group();
    this.coins.create(500, 550, 'coin').setScale(0.3);
    this.coins.create(700, 250, 'coin').setScale(0.3);

    this.physics.add.overlap(this.player, this.coins, this.coinCollect, null, this);

    this.add.rectangle(100, 400, 150, 50, 0xff0000, 0.3);
    this.hasCheckpoint = false;
    this.checkpoint = this.add.zone(100, 400, 150, 50);
    this.physics.add.existing(this.checkpoint);
    this.physics.add.overlap(this.player, this.checkpoint, () => {
      console.log('Checkpoint alcanzado!');
      this.hasCheckpoint = true;
    });

    this.add.rectangle(940, 650, 150, 50, 0x0000ff, 0.3);
    this.meta = this.add.zone(940, 650, 150, 50);
    this.physics.add.existing(this.meta);
    this.physics.add.overlap(this.player, this.meta, this.getmeta, null, this);


    this.cameras.main.setBounds(0, 0, track.width, track.height);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(1);

    this.anims.create({
      key: 'explode',
      frames: [1, 2, 3, 4, 5].map(i => ({ key: `burst${i}` })),
      frameRate: 12,
      hideOnComplete: true
    });

    this.physics.add.overlap(this.player, this.rival, () => {
      if (!this.isExploding) this.explode();
    });

    this.tweens.add({
      targets: this.rival,
      y: 100,
      duration: 4000,
    });

    this.activeRival = false;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.isExploding = false;
  }

  update() {
    if (this.isExploding) return;

    this.handleInput();
    this.checkPixelCollision();

    if (this.player.y < 450 && !this.activeRival) {
        this.ActivarRival();
    }
  }

  coinCollect(player, coin) {
    coin.disableBody(true, true);
    console.log('Moneda recogida!');
  }


getmeta(player, meta) {
    if (this.hasCheckpoint) {  
    console.log('Meta alcanzada!');
    this.scene.pause('Game');
    }
  }

  ActivarRival() {
    this.activeRival = true;
    this.tweens.add({
      targets: this.rival,
      x: 960,
      duration: 900,
    });
  }

  handleInput() {
    const speed = this.cursors.down.isDown ? -140 : 250;
    const rotationSpeed = 3;
    if (this.cursors.up.isDown || this.cursors.down.isDown) {
      this.physics.velocityFromRotation(this.player.rotation - Math.PI/2, speed, this.player.body.velocity);
    } else {
      this.player.setVelocity(0);
    }
    if (this.player.body.speed > 5) {
      const direction = this.cursors.left.isDown ? -1 : (this.cursors.right.isDown ? 1 : 0);
      this.player.rotation += (direction * rotationSpeed) / 60;
    }
  }

  checkPixelCollision() {
    const pixel = this.textures.getPixel(this.player.x, this.player.y, 'barrier');
    if (pixel && pixel.alpha > 0) this.explode();
  }

  explode() {
    this.isExploding = true;
    this.player.setVelocity(0).setVisible(false);
    const boom = this.add.sprite(this.player.x, this.player.y, 'burst1').setScale(0.7);
    boom.play('explode');
    this.time.delayedCall(1500, () => {
      this.player.setPosition(920, 800).setRotation(0).setVisible(true);
      this.isExploding = false;
      this.hasCheckpoint = false;
    });
  }
}