export class Cow extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'cow');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(20, 15);

        this.setCollideWorldBounds(true);

        this.anims.create({
            key: 'cow-idle',
            frames: this.anims.generateFrameNumbers('cow', { start: 0, end: 3 }),
            frameRate: 2,
            repeat: -1
        })
        this.play('cow-idle');
    }


}
