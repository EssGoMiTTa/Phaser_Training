export class Game extends Phaser.Scene {

    constructor() {
        super({key: 'Game'});
    }

    preload() {
        this.load.image('back', 'assets/back.png');
    }

    create() {
        this.add.image(0, 0, 'back').setScale(3);
        this.text1 =this.add.text(10, 10, 'Hello World', { font: '32px Arial', fill: '#ffffff' });
    }

    update() {
        this.text1.x = this.text1.x + 2;

    }
}