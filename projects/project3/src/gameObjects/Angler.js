export class Angler extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'angler');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(20, 15);

        this.setCollideWorldBounds(true);

        this.anims.create({
            key: 'angler-reel',
            frames: this.anims.generateFrameNumbers('angler', { start: 0, end: 5 }),
            frameRate: 4,
            repeat: -1
        })
        this.play('angler-reel');
    }


}