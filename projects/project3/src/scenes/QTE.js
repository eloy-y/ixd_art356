export class QTE extends Phaser.Scene {
  constructor() {
    super('QTE');
  }

  init() {
    this.totalRounds = 10;        // how many QTEs you need to complete
    this.completedRounds = 0;     // how many you've done so far
    this.timeLimit = 2000;        // ms allowed to react
    this.roundTimer = null;
    this.acceptingInput = false;
    this.requiredKey = null;
  }

  create() {
    const { width, height } = this.scale;

    const rect = this.add.rectangle(width /2, height / 2,  360, 240, 0x74a195, 0.8);
    // rect.setAlpha(10);

    // Title / instructions
    this.add
      .text(width / 2, 80, 'Quick Time Event!', {
        fontSize: '32px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    // this.add
    //   .text(width / 2, 120, 'Complete 10 QTEs before failing!', {
    //     fontSize: '18px',
    //     color: '#cccccc',
    //   })
    //   .setOrigin(0.5);

    // ----- Progress Bar (full at start, shrinks each success) -----
    this.barMaxWidth = 300; // total width of the bar
    this.barX = width / 2 - this.barMaxWidth / 2;
    this.barY = 40;

    // Bar background / border
    this.progressBarBg = this.add
      .rectangle(width / 2, this.barY, this.barMaxWidth + 4, 24, 0x000000)
      .setStrokeStyle(2, 0xffffff)
      .setOrigin(0.5);

    // Bar fill (starts full)
    this.progressBarFill = this.add
      .rectangle(this.barX, this.barY, this.barMaxWidth, 16, 0x00ff00)
      .setOrigin(0, 0.5);

    // Label under the bar
    this.barLabel = this.add
      .text(width / 2, this.barY + 20, '', {
        fontSize: '16px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    // Target key display
    this.targetText = this.add
      .text(width / 2, height / 2, '', {
        fontSize: '64px',
        color: '#ffff00',
      })
      .setOrigin(0.5);

    // Feedback text
    this.feedbackText = this.add
      .text(width / 2, height / 2 + 80, '', {
        fontSize: '24px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    // Input handling
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on('keydown', this.handleKey, this);

    // Initialize bar and start the first round
    this.updateProgressBar();
    this.startRound();
  }

  updateProgressBar() {
    const remaining = this.totalRounds - this.completedRounds;
    const ratio = Phaser.Math.Clamp(remaining / this.totalRounds, 0, 1);
    const newWidth = this.barMaxWidth * ratio;

    this.progressBarFill.width = newWidth;
    this.barLabel.setText(
      // `QTEs remaining: ${remaining} / ${this.totalRounds}`
    );
  }

  startRound() {
    this.feedbackText.setText('');

    const options = ['LEFT', 'RIGHT', 'UP', 'DOWN'];
    this.requiredKey = Phaser.Utils.Array.GetRandom(options);

    this.targetText.setText(this.requiredKey);

    if (this.roundTimer) {
      this.roundTimer.remove(false);
    }

    this.acceptingInput = true;

    this.roundTimer = this.time.delayedCall(this.timeLimit, () => {
      this.handleTimeout();
    });
  }

  handleKey(event) {
    if (!this.acceptingInput) return;

    let pressed = null;
    switch (event.code) {
      case 'ArrowLeft':
        pressed = 'LEFT';
        break;
      case 'ArrowRight':
        pressed = 'RIGHT';
        break;
      case 'ArrowUp':
        pressed = 'UP';
        break;
      case 'ArrowDown':
        pressed = 'DOWN';
        break;
      default:
        return; // ignore other keys
    }

    if (!pressed) return;

    this.acceptingInput = false;
    if (this.roundTimer) {
      this.roundTimer.remove(false);
    }

    if (pressed === this.requiredKey) {
      // Correct key
      this.completedRounds++;
      this.feedbackText.setText('Nice!');
      this.updateProgressBar();

      // Finished all 10 QTEs? -> win
      if (this.completedRounds >= this.totalRounds) {
        this.feedbackText.setText('All QTEs complete!');
        this.time.delayedCall(800, () => {
          this.scene.resume('Game', {
            success: true,
            completed: this.completedRounds,
            total: this.totalRounds,
          });
          this.scene.stop();
        });
        return;
      }

      // Make it a bit harder each round (min 600ms)
      this.timeLimit = Math.max(600, this.timeLimit - 100);

      this.time.delayedCall(500, () => this.startRound());
    } else {
      // Wrong key -> game over (fail)
      this.feedbackText.setText('Wrong key!');
      this.endGame();
    }
  }

  handleTimeout() {
    if (!this.acceptingInput) return;
    this.acceptingInput = false;
    this.feedbackText.setText('Too slow!');
    this.endGame();
  }

  endGame() {
    this.time.delayedCall(800, () => {
      this.scene.resume('Game', {
        success: false,
        completed: this.completedRounds,
        total: this.totalRounds,
      });
      this.scene.stop();
    });
  }
}
