export class Game extends Phaser.Scene {
    constructor() {
        super({key: 'Game'});
    }

    preload() {
       this.load.spritesheet('sheet', 'assets/walk.png', 
        {
            frameWidth: 416,
            frameHeight: 454
        });
    }

    create() {

        const walk = 
        {
            key: 'walk',
            frames: this.anims.generateFrameNumbers('sheet', {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]}),
            frameRate: 16,
            repeat: -1
        }
        this.anims.create(walk)

        this.player = this.physics.add.sprite(400, 300, 'sheet').setScale(0.4);
        this.cursosrKeys = this.input.keyboard.createCursorKeys();
    }

    update() {
        const speed = 200;
        if (this.cursosrKeys.right.isDown) {
            this.player.setVelocityX(speed);
            this.player.anims.play('walk', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.stop();
            this.player.setFrame(0);
        }

    }
}