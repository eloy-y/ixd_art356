import { ITEMS } from '../constants/items.js';
import { Angler } from '../gameObjects/Angler.js';

// Two bodies of water (regions), each with their own fish per bait.
// Region 1 = upper-left pool, Region 2 = lower-right pool.
const FISH_BY_REGION_AND_BAIT = {
  1: {
    apple:   { name: 'Anchovy',    speed: 170, jitter: 160,  difficulty: 2.6 },
    chicken: { name: 'Pufferfish', speed: 190, jitter: 190,  difficulty: 2.8 },
    beef:    { name: 'Catfish',    speed: 260, jitter: 230,  difficulty: 3.0 },
  },
  2: {
    apple:   { name: 'Trout',      speed: 80,  jitter: 200,  difficulty: 2.5 },
    chicken: { name: 'Bass',       speed: 120, jitter: 260,  difficulty: 2.9 },
    beef:    { name: 'Crab',       speed: 200, jitter: 310,  difficulty: 3.1 },
  },
};

export class Fishing extends Phaser.Scene {
  constructor() {
    super('Fishing');
  }

  init(data) {
    this.fromSceneKey = data.fromScene || 'Game';
    this.baitKey = data.baitKey;
    this.waterRegion = data.waterRegion || 1;

    const regionTable = FISH_BY_REGION_AND_BAIT[this.waterRegion] || FISH_BY_REGION_AND_BAIT[1];
    this.fishConfig =
      (regionTable && regionTable[this.baitKey]) ||
      regionTable.apple ||
      FISH_BY_REGION_AND_BAIT[1].apple;
  }

  create() {
    const { width, height } = this.scale;

    // Dark overlay
    this.add.rectangle(width / 2, height / 2, width, height, 0x224219, 1);

    // Vertical meter
    this.meterTop = height / 2 - 80;
    this.meterBottom = height / 2 + 80;
    this.meterX = 300;

    this.add.rectangle(
      this.meterX,
      (this.meterTop + this.meterBottom) / 2,
      20,
      160,
      0x222222
    );

    // Catch zone (green)
    this.zoneHeight = 50;
    this.zoneY = this.meterBottom - this.zoneHeight / 2;
    this.zone = this.add.rectangle(
      this.meterX,
      this.zoneY,
      20,
      this.zoneHeight,
      0xd9b34c
    );

    // Fish indicator
    this.fishY = (this.meterTop + this.meterBottom) / 2;
    this.fish = this.add.rectangle(this.meterX, this.fishY, 12, 12, 0x67959c);

    // Progress bar
    this.progress = 0.4;
    this.progressBarBg = this.add.rectangle(
      width / 2,
      this.meterTop - 30,
      120,
      10,
      0x333333
    );
    this.progressBar = this.add
      .rectangle(width / 2 - 60, this.meterTop - 30, 120 * this.progress, 10, 0x2ba3ff)
      .setOrigin(0, 0.5);

    this.add
      .text(
        width / 2,
        this.meterTop - 55,
        `Fishing with ${ITEMS[this.baitKey]?.name || 'Bait'}`,
        {
          fontSize: '12px',
          color: '#ffffff',
        }
      )
      .setOrigin(0.5);

    this.add
      .text(width / 2, this.meterBottom + 30, 'Hold SPACE to move zone up', {
        fontSize: '12px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    const lake = this.add.image(170, 120, 'lake',);
    lake.setScale(0.3, 0.3);

    this.angler = new Angler (this, 50, 115);
    this.angler.setScale(2, 2);

    // Movement parameters
    this.zoneVelocity = 0;
    this.zoneGravity = 200;
    this.zoneBoost = -300;

    this.fishVelocity = 0;
    this.fishTargetDir = Phaser.Math.Between(0, 1) ? 1 : -1;
    this.timeSinceDirChange = 0;

    this.keys = this.input.keyboard.addKeys('SPACE');

    this.caught = false;
    this.failed = false;
  }

  update(time, delta) {
    const dt = delta / 1000;

    // ---- Catch zone movement (player controlled) ----
    if (this.keys.SPACE.isDown) {
      this.zoneVelocity += this.zoneBoost * dt;
    }
    this.zoneVelocity += this.zoneGravity * dt;
    this.zoneY += this.zoneVelocity * dt;

    const half = this.zoneHeight / 2;
    if (this.zoneY - half < this.meterTop) {
      this.zoneY = this.meterTop + half;
      this.zoneVelocity = 0;
    }
    if (this.zoneY + half > this.meterBottom) {
      this.zoneY = this.meterBottom - half;
      this.zoneVelocity = 0;
    }
    this.zone.y = this.zoneY;

    // ---- Fish movement (auto) ----
    this.timeSinceDirChange += dt;
    if (this.timeSinceDirChange > Phaser.Math.FloatBetween(0.4, 1.2)) {
      this.fishTargetDir = Phaser.Math.Between(0, 1) ? 1 : -1;
      this.timeSinceDirChange = 0;
    }

    const baseSpeed = this.fishConfig.speed;
    const jitter = this.fishConfig.jitter;

    this.fishVelocity +=
      (this.fishTargetDir * baseSpeed + Phaser.Math.Between(-jitter, jitter)) * dt;
    this.fishVelocity *= 0.92;
    this.fishY += this.fishVelocity * dt;

    if (this.fishY < this.meterTop) {
      this.fishY = this.meterTop;
      this.fishVelocity *= -0.5;
    } else if (this.fishY > this.meterBottom) {
      this.fishY = this.meterBottom;
      this.fishVelocity *= -0.5;
    }

    this.fish.y = this.fishY;

    // ---- Progress logic ----
    const fishInsideZone = Math.abs(this.fishY - this.zoneY) < this.zoneHeight / 2;

    const fillRate = 0.12;
    const drainRate = 0.09 * this.fishConfig.difficulty;

    if (fishInsideZone) {
      this.progress += fillRate * dt;
    } else {
      this.progress -= drainRate * dt;
    }

    this.progress = Phaser.Math.Clamp(this.progress, 0, 1);
    this.progressBar.width = 120 * this.progress;

    if (!this.caught && !this.failed) {
      if (this.progress >= 1) {
        this.onCatch();
      } else if (this.progress <= 0) {
        this.onFail();
      }
    }
  }

  onCatch() {
    this.caught = true;
    const gameScene = this.scene.get(this.fromSceneKey);

    if (gameScene) {
      const fishName = this.fishConfig.name;

      if (!gameScene.fishInventory) {
        gameScene.fishInventory = {};
      }
      if (!gameScene.fishInventory[fishName]) {
        gameScene.fishInventory[fishName] = 1;
      } else {
        gameScene.fishInventory[fishName]++;
      }

      if (gameScene.updateFishInventoryText) {
        gameScene.updateFishInventoryText();
      }

      if (gameScene.showFloatingText && gameScene.player) {
        gameScene.showFloatingText(
          `Caught: ${fishName}!`,
          gameScene.player.x,
          gameScene.player.y
        );
      }
    }

    this.time.delayedCall(500, () => {
      this.scene.stop();
      if (gameScene) {
        gameScene.scene.resume();
      }
    });
  }

onFail() {
    this.failed = true;
    const gameScene = this.scene.get(this.fromSceneKey);

    if (gameScene && gameScene.showFloatingText && gameScene.player) {
      gameScene.showFloatingText(
        'The fish escaped...',
        gameScene.player.x,
        gameScene.player.y
      );
    }

    this.time.delayedCall(500, () => {
      this.scene.stop();
      if (gameScene) {
        gameScene.scene.resume();
      }
    });
  }
}