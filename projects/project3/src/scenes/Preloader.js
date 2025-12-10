export class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        // //  We loaded this image in our Boot Scene, so we can display it here
        // this.add.image(512, 384, 'background');

        // //  A simple progress bar. This is the outline of the bar.
        // this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        // //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        // const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        // //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        // this.load.on('progress', (progress) => {

        //     //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
        //     bar.width = 4 + (460 * progress);

        // });
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.spritesheet(
            'mc',
            'angler - idle.png',
            {frameWidth: 80, frameHeight: 80}
        );

        this.load.spritesheet(
            'move',
            'angler - walk.png',
            {frameWidth: 80, frameHeight: 80}
        );

        this.load.spritesheet(
            'angler',
            'angler - fishing reeling.png',
            {frameWidth: 80, frameHeight: 80}
        );

        this.load.spritesheet(
            'dude', 
            'dude.png', 
            {frameWidth: 32, frameHeight: 48}
        );

        this.load.spritesheet(
            'chicken',
            'Chicken.png',
            {frameWidth: 16, frameHeight: 16}
        );

        this.load.spritesheet(
            'cow',
            'Cow.png',
            {frameWidth: 32, frameHeight: 32}
        );

        this.load.image(
            'tree',
            'Tree.png',
        );

        this.load.image(
            'lake',
            'lake.png',
        );

        // tiled map
        this.load.tilemapTiledJSON('map1','map/map2.json');

        //tiled map images
        this.load.image('ts_dirt', 'tileset/dirt.png');
        this.load.image('ts_summer', 'tileset/summer.png');
        this.load.image('ts_house', 'tileset/House.png');
        this.load.image('ts_housedetails', 'tileset/House.png');
        this.load.image('ts_water_shallow', 'tileset/shallow1.png');
        this.load.image('ts_waterfall', 'tileset/waterfall1.png');
        this.load.image('ts_water_deep', 'tileset/deep1.png');
        this.load.image('ts_fence', 'tileset/Fence - wood.png');
        this.load.image('ts_dirt_path', 'tileset/dirt path.png');
        this.load.image('ts_bridge', 'tileset/Bridge - wood.png');
        this.load.image('ts_dirt_dark', 'tileset/dirt - dark.png');
        this.load.image('ts_texture', 'tileset/Texture.png');
        this.load.image('ts_water_plant', 'tileset/water plant 1.png');
        this.load.image('ts_water_lily', 'tileset/water lily 1.png');
        this.load.image('ts_flower', 'tileset/Flower.png');
        this.load.image('ts_sign', 'tileset/Sign.png');

        // Placeholder fish icons (replace files in assets/fish later if you like)
        this.load.image('fish_anchovy', 'fish/fish_anchovy.png');
        this.load.image('fish_pufferfish', 'fish/fish_pufferfish.png');
        this.load.image('fish_catfish', 'fish/fish_catfish.png');
        this.load.image('fish_trout', 'fish/fish_trout.png');
        this.load.image('fish_bass', 'fish/fish_bass.png');
        this.load.image('fish_crab', 'fish/fish_crab.png');
        this.load.image('fish_placeholder', 'fish/fish_placeholder.png');


    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('Instructions');
    }
}
