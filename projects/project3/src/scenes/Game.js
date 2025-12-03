import { Player } from '../gameObjects/Player.js';

export class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    create() {
        // map
        const map = this.make.tilemap({ key: 'map1' })

        // Names below must match Tiled tileset "Name" fields from map1.json
    const ts_dirt = map.addTilesetImage('dirt', 'ts_dirt');
    const ts_summer = map.addTilesetImage('summer', 'ts_summer');
    const ts_house = map.addTilesetImage('House', 'ts_house');
    const ts_water = map.addTilesetImage('water', 'ts_water_shallow');
    const ts_waterfall = map.addTilesetImage('waterfall', 'ts_waterfall');
    const ts_water_deep = map.addTilesetImage('water - deep', 'ts_water_deep');
    const ts_fence = map.addTilesetImage('Fence', 'ts_fence');
    const ts_dirt_path = map.addTilesetImage('dirt path', 'ts_dirt_path');
    const ts_bridge = map.addTilesetImage('bridge', 'ts_bridge');
    const ts_dirtdark = map.addTilesetImage('dirtdark', 'ts_dirt_dark');
    const ts_texture = map.addTilesetImage('Texture', 'ts_texture');
    const ts_waterplant = map.addTilesetImage('water plant ', 'ts_water_plant'); // note trailing space
    const ts_waterlily = map.addTilesetImage('water lily ', 'ts_water_lily');  // note trailing space
    const ts_flower = map.addTilesetImage('Flower', 'ts_flower');
    const ts_sign = map.addTilesetImage('Sign', 'ts_sign');

    // Any tileset used by a layer must be passed in the array
    const allSets = [
      ts_dirt, ts_summer, ts_house, ts_water, ts_waterfall, ts_water_deep,
      ts_fence, ts_dirt_path, ts_bridge, ts_dirtdark, ts_texture,
      ts_waterplant, ts_waterlily, ts_flower, ts_sign
    ];

    // --- Layers (draw in a sensible back-to-front order) ---
    const background = map.createLayer('background', allSets, 0, 0);
    const water = map.createLayer('water', allSets, 0, 0);
    const waterfall = map.createLayer('waterfall', allSets, 0, 0);
    const grass = map.createLayer('grass', allSets, 0, 0);
    const steps = map.createLayer('steps', allSets, 0, 0);
    const forage = map.createLayer('forage', allSets, 0, 0);
    const fence = map.createLayer('fence', allSets, 0, 0);
    const gate = map.createLayer('gate', allSets, 0, 0);
    const house = map.createLayer('house', allSets, 0, 0);
    const housedetails = map.createLayer('housedetails', allSets, 0, 0);
    const bridge = map.createLayer('bridge', allSets, 0, 0);
    const base = map.createLayer('base', allSets, 0, 0);


    water.setCollisionByExclusion([-1]);
    house.setCollisionByExclusion([-1]);
    housedetails.setCollisionByExclusion([-1]);
    fence.setCollisionByExclusion([-1]);




    this.platform = this.physics.add.staticGroup();

    


    this.player = new Player(this, 20, 80);
    this.player.setScale(1)

    this.physics.add.collider(this.player, fence);
    this.physics.add.collider(this.player, house);
    this.physics.add.collider(this.player, housedetails);
    this.physics.add.collider(this.player, water);

    // World bounds = map size
    // this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        

        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        })


    this.input.keyboard.on('keydown-SPACE', () => {
        this.scene.pause('Game');
        this.scene.launch('QTE');
    });
        
    }

    update() {
        this.player.setVelocity(0);

        let moving = false;
        this.player.setFlipX(false);

        if (this.wasd.left.isDown)
        {
            this.player.setFlipX(true);
            this.player.moveLeft();
            moving = true;
            this.player.lastDirection = 'left';
        }
        else if (this.wasd.right.isDown)
        {
            this.player.moveRight();
            moving = true;
            this.player.lastDirection = 'right';
        }
        else if (this.wasd.up.isDown)
        {
            this.player.moveUp();
            moving = true;
            this.player.lastDirection = 'up';
        }
        else if (this.wasd.down.isDown)
        {
            this.player.moveDown();
            moving = true;
            this.player.lastDirection = 'down';
        }

        // if(!moving){
        //     this.player.idleDown();
        // }

        if(!moving){
            if (this.player.lastDirection === 'left')
            {
                this.player.setFlipX(true);
                this.player.idleSide();
            }
            else if (this.player.lastDirection === 'right')
            {
                this.player.idleSide();
            }
            else if (this.player.lastDirection === 'up')
            {
                this.player.idleUp();
            }
            else if (this.player.lastDirection === 'down')
            {
                this.player.idleDown();
            }


        }

    }
}
