export class Instructions extends Phaser.Scene {
  constructor() {
    super('Instructions');
  }

  create() {
    const { width, height } = this.scale;

    // Dim background
    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7);

    this.add
      .text(width / 2, 30, 'The Angler Life', {
        fontSize: '18px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    const lines = [
      'Controls:',
      '- Move: W A S D',
      '- Interact: E ',
      '- Open Bag: F',
      '',
      'Gameplay:',
      '- Find thing you can use as bait',
      '  Play a Quick Time Event to obtain bait.',
      '- Fish in any water source and choose your bait',
      '  Complete the fishing minigame to catch the fish',
      '- Collect as much fish as you can!',
    ];

    this.add
      .text(width / 2, 100, lines.join('\n'), {
        fontSize: '10px',
        color: '#ffffff',
        align: 'left',
      })
      .setOrigin(0.5);

    // Simple Start button
    const button = this.add
      .rectangle(width / 2, height - 40, 140, 30, 0xffffff)
      .setInteractive();

    const label = this.add
      .text(width / 2, height - 40, 'Start Game', {
        fontSize: '14px',
        color: '#000000',
      })
      .setOrigin(0.5);

    button.on('pointerover', () => {
      button.setFillStyle(0xffff99);
    });

    button.on('pointerout', () => {
      button.setFillStyle(0xffffff);
    });

    button.on('pointerup', () => {
      this.scene.start('Game');
    });

    // Also allow pressing Enter or E to start
    this.input.keyboard.on('keydown-ENTER', () => {
      this.scene.start('Game');
    });
    this.input.keyboard.on('keydown-E', () => {
      this.scene.start('Game');
    });
  }
}
