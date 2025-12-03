export class Player extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'mc');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(12, 14);

        this.setCollideWorldBounds(true);
        this.initAnimations();
        this.lastDirection = 'down'
    }

    initAnimations()
    {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('move', { start: 0, end: 7 }),
            frameRate: 12,
            repeat: -1
    });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('move', { start: 0, end: 7 }),
            frameRate: 12,
            repeat: -1
    });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('move', { start: 16, end: 23 }),
            frameRate: 12,
            repeat: -1
    });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('move', { start: 8, end: 15 }),
            frameRate: 12,
            repeat: -1
    });

        this.anims.create({
            key: 'idleside',
            frames: this.anims.generateFrameNumbers('mc', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
    });

        this.anims.create({
            key: 'idledown',
            frames: this.anims.generateFrameNumbers('mc', { start: 4, end: 7 }),
            frameRate: 6,
            repeat: -1
    });

        this.anims.create({
            key: 'idleup',
            frames: this.anims.generateFrameNumbers('mc', { start: 8, end: 11 }),
            frameRate: 6,
            repeat: -1
    });

    }

    moveLeft()
    {
        this.setVelocityX(-50);

        this.anims.play('left', true);
    }

    moveRight()
    {
        this.setVelocityX(50);

        this.anims.play('right', true);
    }

    moveUp(){
        this.setVelocityY(-50);

        this.anims.play('up', true);
    }

    moveDown(){
        this.setVelocityY(50);

        this.anims.play('down', true);
    }

    idleDown()
    {
        this.anims.play('idledown', true);
    }

    idleSide(){
        this.anims.play('idleside', true);
    }

    idleUp(){
        this.anims.play('idleup', true);
    }


}