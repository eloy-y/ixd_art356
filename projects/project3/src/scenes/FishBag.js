export class FishBag extends Phaser.Scene {
  constructor() {
    super('FishBag');
  }

  init(data) {
    this.fromSceneKey = data.fromScene || 'Game';
  }

  create() {
    const { width, height } = this.scale;
    const gameScene = this.scene.get(this.fromSceneKey);

    this.add.rectangle(width / 2, height / 2 + 22, 220, 195, 0x000000, 0.8);
    this.add
      .text(width / 2, height / 2 - 65, 'Fish Bag', {
        fontSize: '16px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    let startY = height / 2 - 40;

    if (!gameScene || !gameScene.fishInventory || !Object.keys(gameScene.fishInventory).length) {
      this.add
        .text(width / 2, height / 2, 'No fish caught yet', {
          fontSize: '12px',
          color: '#cccccc',
        })
        .setOrigin(0.5);
    } else {
      const entries = Object.entries(gameScene.fishInventory);
      const iconMap = {
        Anchovy: 'fish_anchovy',
        Pufferfish: 'fish_pufferfish',
        Catfish: 'fish_catfish',
        Trout: 'fish_trout',
        Bass: 'fish_bass',
        Crab: 'fish_crab',
      };

      entries.forEach(([name, count], index) => {
        const y = startY + index * 28;

        const iconKey = iconMap[name] || 'fish_placeholder';
        this.add.image(width / 2 - 70, y, iconKey).setScale(1);

        this.add.text(width / 2 - 50, y - 8, name, {
          fontSize: '12px',
          color: '#ffffff',
        });

        this.add.text(width / 2 + 40, y - 8, `x${count}`, {
          fontSize: '12px',
          color: '#ffff00',
        });
      });
    }

    this.add
      .text(width / 2, height / 2 + 114, 'Press F to close', {
        fontSize: '10px',
        color: '#aaaaaa',
      })
      .setOrigin(0.5);

    this.input.keyboard.on('keydown-ESC', () => this.close());
    this.input.keyboard.on('keydown-F', () => this.close());
  }

  close() {
    const gameScene = this.scene.get(this.fromSceneKey);
    this.scene.stop();
    if (gameScene) {
      gameScene.scene.resume();
    }
  }
}
