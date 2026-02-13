export class Game extends Phaser.Scene {

    constructor() {
        super({key: 'Game'});
    }

    preload() {
        this.load.image('car', 'assets/car0.png');
    }

    create() {
        this.car = this.physics.add.sprite(400, 300, 'car');
        this.car.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
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
        
}