export class Menu extends Phaser.Scene {
    constructor() {
        super({key: 'Menu'});
    }

    preload() {

    }

    create() {
        this.cameras.main.setBackgroundColor('#ffffff');

        this.add.text(400, 200, 'Menú F1', { fontSize: '32px', fill: '#000' }).setOrigin(0.5);

        const boton = this.add.text(400, 300, 'Continuar', { fontSize: '24px', fill: '#ffffff', backgroundColor: '#000000', padding: 10 }).setOrigin(0.5);

        boton.setInteractive();

        boton.on('pointerdown', () => {
            this.scene.start('Game');
        });
    }

    update() {

    }
}