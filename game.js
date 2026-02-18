export class Game extends Phaser.Scene {

    constructor() {
        super({key: 'Game'});
    }

    preload() {
        this.load.image('car', 'assets/car0.png');
        this.load.image('coin', 'assets/coin.png');
    }

    create() {
        this.car = this.physics.add.sprite(400, 300, 'car');
        this.car.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.coin = this.physics.add.group({
            key: 'coin',
            repeat: 5,
            setXY: { x: 100, y: 100, stepX: 120 },
            setScale: { x: 0.5, y: 0.5 }
        });

        this.score = 0;
        this.scoreText = this.add.text(10, 10, 'Puntos: ' + this.score, { font: '32px', fill: '#ffffff' });

        this.physics.add.overlap(this.car, this.coin, this.collectCoin, null, this);

        const buttonMenu = this.add.text(700, 550, 'MENÚ', {
            fontSize: '24px',
            fill: '#ffffff',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

        buttonMenu.setInteractive();

        buttonMenu.on('pointerdown', () => {
            this.scene.start('Menu');
        });
    }

    update() {
        const speed = 200;

        if (this.cursors.left.isDown) 
        {
            this.car.setVelocityX(-speed);
        }
        else if (this.cursors.right.isDown)
        {
            this.car.setVelocityX(speed);
        }
       else if (this.cursors.up.isDown)
        {
            this.car.setVelocityY(-speed);
        } 
        else if (this.cursors.down.isDown)
        {
            this.car.setVelocityY(speed);
        }
        else(this.car.setVelocity(0));
    }

    collectCoin(car, coin) {
        coin.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Puntos: ' + this.score);
    }
        
}