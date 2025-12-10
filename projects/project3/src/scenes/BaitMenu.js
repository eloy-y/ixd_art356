import { ITEMS } from '../constants/items.js';

export class BaitMenu extends Phaser.Scene {
  constructor() {
    super('BaitMenu');
  }

  init(data) {
    this.fromSceneKey = data.fromScene || 'Game';
    this.baits = data.baits || [];
    this.waterRegion = data.waterRegion || 1;
    this.selectedIndex = 0;
  }

  create() {
    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, 180, 120, 0x000000, 0.7);
    this.add
      .text(width / 2, height / 2 - 40, 'Choose Bait', {
        fontSize: '14px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    this.optionTexts = this.baits.map((key, i) => {
      return this.add
        .text(width / 2, height / 2 - 10 + i * 18, ITEMS[key].name, {
          fontSize: '12px',
          color: '#ffffff',
        })
        .setOrigin(0.5);
    });

    this.updateSelection();

    this.input.keyboard.on('keydown-UP', () => {
      if (!this.baits.length) return;
      this.selectedIndex =
        (this.selectedIndex + this.baits.length - 1) % this.baits.length;
      this.updateSelection();
    });

    this.input.keyboard.on('keydown-DOWN', () => {
      if (!this.baits.length) return;
      this.selectedIndex = (this.selectedIndex + 1) % this.baits.length;
      this.updateSelection();
    });

    this.input.keyboard.on('keydown-ENTER', () => this.confirm());
    this.input.keyboard.on('keydown-ESC', () => this.cancel());
  }

  updateSelection() {
    if (!this.optionTexts) return;
    this.optionTexts.forEach((t, i) => {
      t.setStyle({ color: i === this.selectedIndex ? '#ffff00' : '#ffffff' });
    });
  }

  confirm() {
    if (!this.baits.length) {
      this.cancel();
      return;
    }
    const baitKey = this.baits[this.selectedIndex];
    const gameScene = this.scene.get(this.fromSceneKey);

    if (gameScene && gameScene.inventory) {
      gameScene.inventory[baitKey] = Math.max(
        0,
        (gameScene.inventory[baitKey] || 0) - 1
      );
      if (gameScene.updateInventoryText) {
        gameScene.updateInventoryText();
      }
    }

    this.scene.stop();
    this.scene.launch('Fishing', {
      fromScene: this.fromSceneKey,
      baitKey,
      waterRegion: this.waterRegion,
    });
  }

  cancel() {
    const gameScene = this.scene.get(this.fromSceneKey);
    this.scene.stop();
    if (gameScene) {
      gameScene.scene.resume();
    }
  }
}
