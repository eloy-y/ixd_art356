import { Player } from '../gameObjects/Player.js';
import { Cow } from '../gameObjects/Cow.js';
import { Chickenz } from '../gameObjects/Chickenz.js';

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
    this.waterLayer = water;
    const waterfall = map.createLayer('waterfall', allSets, 0, 0);
    const grass = map.createLayer('grass', allSets, 0, 0);
    const steps = map.createLayer('steps', allSets, 0, 0);
    const forage = map.createLayer('forage', allSets, 0, 0);
    const fence = map.createLayer('fence', allSets, 0, 0);
    const gate = map.createLayer('gate', allSets, 0, 0);
    this.gateLayer = gate;
    const house = map.createLayer('house', allSets, 0, 0);
    const bridge = map.createLayer('bridge', allSets, 0, 0);
    const base = map.createLayer('base', allSets, 0, 0);
    const housedetails = map.createLayer('housedetails', allSets, 0, 0);


    water.setCollisionByExclusion([-1]);
    house.setCollisionByExclusion([-1]);
    housedetails.setCollisionByExclusion([-1]);
    fence.setCollisionByExclusion([-1]);
    gate.setCollisionByExclusion([-1]);




    this.platform = this.physics.add.staticGroup();

    


    this.player = new Player(this, 20, 80);
    this.player.setScale(1)

    const tree = this.add.image(70, 80, 'tree');
    this.physics.add.existing(tree);
    tree.body.setImmovable(true);
    this.tree1 = tree;

    const tree2 = this.add.image(335, 120, 'tree');
    this.physics.add.existing(tree2);
    tree2.body.setImmovable(true);
    this.tree2 = tree2;

    this.cow = new Cow(this, 280, 28);

    this.cow2 = new Cow(this, 295, 45);
    this.cow2.setFlipX(true);

    this.chicken = new Chickenz(this, 65, 200);
    this.chicken.setFlipX(true);

    this.chicken2 = new Chickenz(this, 40, 210);
    this.chicken2.setFlipX(true);

    this.chicken3 = new Chickenz(this, 50, 170);
    this.chicken3.setFlipX(true);

    this.chicken4 = new Chickenz(this, 30, 185);
    this.chicken4.setFlipX(true);
    

    this.physics.add.collider(this.player, tree);
    this.physics.add.collider(this.player, tree2);
    this.physics.add.collider(this.player, fence);
    this.physics.add.collider(this.player, house);
    this.physics.add.collider(this.player, housedetails);
    this.physics.add.collider(this.player, water);
    this.physics.add.collider(this.player, gate);

    // World bounds = map size
    // this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        

        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        })


        // Key to open Fish Bag
        this.bagKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);



    // --- Simple inventory system for bait items ---
    this.inventory = { apple: 0, chicken: 0, beef: 0};

    const baitInv = this.add.rectangle(230, 20,  55, 48, 0x000000, 0.7);
    this.inventoryText = this.add.text(207, 3, '', {
        fontSize: '9px',
        fill: '#ffffff'
    }).setScrollFactor(0)

    this.updateInventoryText = () => {
        this.inventoryText.setText(
            `BAIT \nApple:${this.inventory.apple}  \nChicken:${this.inventory.chicken}  \nBeef:${this.inventory.beef}`
        );
    };
    this.updateInventoryText();

    // Small prompt bubble that appears when you can interact
    this.interactPrompt = this.add.text(0, 0, 'E', {
        fontSize: '10px',
        fill: '#ffffff',
        backgroundColor: '#000000'
    }).setOrigin(0.5).setScrollFactor(0);
    this.interactPrompt.visible = false;

    // --- Fish inventory (caught fish) ---
    this.fishInventory = {};

    // this.updateFishInventoryText = () => {
    //     const entries = Object.entries(this.fishInventory)
    //         .map(([name, count]) => `${name}: ${count}`)
    //         .join('   ');
    //     if (!this.fishText) {
    //         this.fishText = this.add.text(10, 25, entries, {
    //             fontSize: '12px',
    //             fill: '#00ffff'
    //         }).setScrollFactor(0);
    //     } else {
    //         this.fishText.setText(entries);
    //     }
    // };
    // this.updateFishInventoryText();

    this.showFloatingText = (msg, x, y) => {
        const t = this.add.text(x, y - 20, msg, {
            fontSize: '10px',
            fill: '#ffff00',
            stroke: '#000000',
            strokeThickness: 2,
        }).setOrigin(0.5);

        this.tweens.add({
            targets: t,
            y: y - 40,
            alpha: 0,
            duration: 2000,
            onComplete: () => t.destroy()
        });
    };

    this.hasAnyBait = () => {
        return this.inventory.apple > 0 ||
               this.inventory.chicken > 0 ||
               this.inventory.beef > 0;
    };

    this.getAvailableBaits = () => {
        const list = [];
        if (this.inventory.apple > 0) list.push('apple');
        if (this.inventory.chicken > 0) list.push('chicken');
        if (this.inventory.beef > 0) list.push('beef');
        return list;
    };

    this.canFishHere = () => {
        if (!this.waterLayer || !this.player) return false;

        const offset = 16;
        let dx = 0;
        let dy = 0;

        switch (this.player.lastDirection) {
            case 'left':
                dx = -offset;
                break;
            case 'right':
                dx = offset;
                break;
            case 'up':
                dy = -offset;
                break;
            case 'down':
                dy = offset;
                break;
        }

        const worldX = this.player.x + dx;
        const worldY = this.player.y + dy;

        const tile = this.waterLayer.getTileAtWorldXY(
            worldX,
            worldY,
            true,
            this.cameras.main
        );

        if (!tile || tile.index === -1) {
            this.currentWaterRegion = null;
            return false;
        }

        // Determine which body of water this tile belongs to.
        // These ranges come from the map's water layer (two separate pools).
        const tx = tile.x;
        const ty = tile.y;

        let region = null;

        // Lake 1 (upper-left pool): tiles x 0-8, y 0-7
        if (tx >= 0 && tx <= 8 && ty >= 0 && ty <= 7) {
            region = 1;
        }
        // Lake 2 (lower-right pool): tiles x 17-30, y 25-29
        else if (tx >= 17 && tx <= 30 && ty >= 25 && ty <= 29) {
            region = 2;
        }

        this.currentWaterRegion = region;
        return region !== null;
    };

    this.getQTEInteractionType = () => {
        if (!this.player) return null;

        const offset = 16;
        let dx = 0;
        let dy = 0;

        switch (this.player.lastDirection) {
            case 'left':
                dx = -offset;
                break;
            case 'right':
                dx = offset;
                break;
            case 'up':
                dy = -offset;
                break;
            case 'down':
                dy = offset;
                break;
        }

        const worldX = this.player.x + dx;
        const worldY = this.player.y + dy;

        // 1) Check if facing a gate tile
        if (this.gateLayer) {
            const gateTile = this.gateLayer.getTileAtWorldXY(
                worldX,
                worldY,
                true,
                this.cameras.main
            );
            if (gateTile && gateTile.index !== -1) {
                const tx = gateTile.x;
                const ty = gateTile.y;

                // Gate cluster near cows (upper-right) -> beef bait
                if (tx >= 33 && tx <= 38 && ty >= 7 && ty <= 8) {
                    return 'beef';
                }
                // Gate cluster near chickens (lower-left) -> chicken bait
                if (tx >= 9 && tx <= 10 && ty >= 21 && ty <= 26) {
                    return 'chicken';
                }
            }
        }

        // 2) Check if near one of the trees
        const maxDist = 24;
        const targets = [];
        if (this.tree1) targets.push(this.tree1);
        if (this.tree2) targets.push(this.tree2);

        for (let i = 0; i < targets.length; i++) {
            const t = targets[i];
            const d = Phaser.Math.Distance.Between(worldX, worldY, t.x, t.y);
            if (d <= maxDist) {
                return 'apple';
            }
        }

        return null;
    };


    this.input.keyboard.on('keydown-E', () => {
        // If near water, start fishing. Otherwise, do foraging QTE.
        if (this.canFishHere()) {
            if (!this.hasAnyBait()) {
                this.showFloatingText('No bait!', this.player.x, this.player.y);
                return;
            }

            this.scene.pause('Game');
            this.scene.launch('BaitMenu', {
                fromScene: 'Game',
                baits: this.getAvailableBaits(),
                waterRegion: this.currentWaterRegion || 1
            });
        } else {
            const interactionType = this.getQTEInteractionType();
            if (!interactionType) {
                return;
            }
            this.scene.pause('Game');
            this.scene.launch('QTE', { rewardType: interactionType });
        }
    });
        
    }

    update() {
        this.player.setVelocity(0);

        let moving = false;
        this.player.setFlipX(false);

        // Update interact prompt (for water or QTE spots)
        let showPrompt = false;
        let promptYOff = 24;

        if (this.canFishHere && this.canFishHere()) {
            showPrompt = true;
        } else if (this.getQTEInteractionType) {
            const t = this.getQTEInteractionType();
            if (t) showPrompt = true;
        }

        if (this.interactPrompt) {
            this.interactPrompt.visible = showPrompt;
            if (showPrompt && this.player) {
                this.interactPrompt.x = this.player.x - this.cameras.main.scrollX;
                this.interactPrompt.y = this.player.y - promptYOff - this.cameras.main.scrollY;
            }
        }

        // Open Fish Bag menu with F
        if (Phaser.Input.Keyboard.JustDown(this.bagKey)) {
            this.scene.pause();
            this.scene.launch('FishBag', { fromScene: 'Game' });
            return;
        }

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
