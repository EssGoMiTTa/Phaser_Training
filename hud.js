export class Hud extends Phaser.Scene {
    constructor() {
        super({ key: 'Hud' });
    }

    create() {

        this.registry.set('puntos', 0);
        this.registry.set('tiempo', 15);

        this.scoreText = this.add.text(10, 10, 'Puntos: 0', { fontSize: '24px', fill: '#ffffff', backgroundColor: '#000000'});
        this.timeText = this.add.text(10, 30, 'Tiempo: 15s', { fontSize: '16px', fill: '#ffffff', backgroundColor: '#000000'});

        this.textfinal = this.add.text(400, 300, '', { 
            fontSize: '64px', 
            fill: '#ffffff', 
            backgroundColor: '#000000', 
            fontStyle: 'bold'
        }).setOrigin(0.5).setVisible(false);

        this.registry.events.on('changedata', (parent, key, data) => {
            if (key === 'puntos') {
                this.scoreText.setText('Puntos: ' + data);
            }
            if (key === 'tiempo') {
                this.timeText.setText('Tiempo: ' + data + 's')
            }
        });

        this.timeEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTime,
            callbackScope: this,
            loop: true
        });


        this.btnMenu = this.add.text(700, 550, 'MENÚ', { 
            fontSize: '20px', 
            fill: '#ffffff', 
            backgroundColor: '#000000',
            padding: 5 
        }).setInteractive();

        this.btnMenu.on('pointerdown', () => {
            this.registry.events.off('changedata');
            this.scene.stop('Game');
            this.scene.start('Menu');
        });

        this.btnAgain = this.add.text(350, 380, 'Reiniciar', { 
            fontSize: '20px', 
            fill: '#ffffff', 
            backgroundColor: '#000000',
            padding: 5 
        }).setInteractive().setVisible(false);

        this.btnAgain.on('pointerdown', () => {
            this.registry.events.off('changedata');
            this.scene.stop('Game');
            this.scene.start('Game');
        });
    }

    updateTime() {
        let t = this.registry.get('tiempo') - 1;
        this.registry.set('tiempo', t);

        if (t <= 0) {
            this.terminarJuego('¡Perdiste!');
            console.log('Tiempo agotado!');
            this.btnAgain.setVisible(true);
        }
    }

    terminarJuego(resultado) {
        this.textfinal.setText(resultado).setVisible(true);
        this.time.removeAllEvents();
        this.scene.pause('Game');
    }

}