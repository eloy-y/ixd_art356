export class Chickenz extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'chicken');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(10, 12);

        this.setCollideWorldBounds(true);

        this.anims.create({
            key: 'chicken-idle',
            frames: this.anims.generateFrameNumbers('chicken', { start: 0, end: 3 }),
            frameRate: 3,
            repeat: -1
        })
        this.play('chicken-idle');
    }
}
