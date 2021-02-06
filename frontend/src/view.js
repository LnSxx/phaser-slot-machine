/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/extensions
import settings from './settings.js';

const IMAGES = {
  start_button: 'start_button',
  stop_button: 'stop_button',
  reel: 'reel',
};

export default class View {
  constructor() {
    this.reels = [];
    this.frameCounter = 0;
    this.maxAccelerationSpeed = 30;
    this.minDecelerationSpeed = 10;
  }

  loadImages(scene, backendURL) {
    scene.load.setBaseURL(backendURL);
    scene.load.image(IMAGES.start_button, 'images/start_button.png');
    scene.load.image(IMAGES.stop_button, 'images/stop_button.png');
    scene.load.image(IMAGES.reel, 'images/reel.png');
  }

  createWorld(scene, startButtonHandler, stopButtonHandler) {
    const startButton = scene.add.image(700, 200, IMAGES.start_button);
    const stopButton = scene.add.image(700, 400, IMAGES.stop_button);
    for (let i = 0; i < settings.NUMBER_OF_WHEELS; i++) {
      this.reels.push(scene.add.tileSprite(this.getLocationX(i), 300, 100, 300, IMAGES.reel));
    }
    startButton.setInteractive();
    stopButton.setInteractive();
    startButton.on('pointerdown', () => {
      startButtonHandler();
    });
    stopButton.on('pointerdown', () => {
      stopButtonHandler();
    });
  }

  getLocationX(index) {
    return index * 100 + 100;
  }

  getCoordinateY(numberOfEntity) {
    return -100 * numberOfEntity + 100;
  }

  countFrame() {
    this.frameCounter++;
  }

  resetFrameCounter() {
    this.frameCounter = 0;
  }

  getAccelerationSpeed(i) {
    const speed = Math.round(((10 / (i + 1)) * this.frameCounter) / 10);
    if (speed >= this.maxAccelerationSpeed) {
      return this.maxAccelerationSpeed;
    }
    return speed;
  }

  getDecelerationSpeed(i) {
    const decSpeed = Math.round(1 / ((this.frameCounter * (1 / (i + 1))) / 300));
    if (decSpeed <= this.minDecelerationSpeed) {
      return this.minDecelerationSpeed;
    }
    return decSpeed;
  }

  staticTileSprite(tileSprites) {
    for (const reel of tileSprites) {
      reel.tilePositionY = 0;
    }
  }

  getReelHeight(number, heightOfEntity) {
    return number * heightOfEntity;
  }

  acceleration(tileSprites) {
    for (let i = 0; i < tileSprites.length; i++) {
      tileSprites[i].tilePositionY -= this.getAccelerationSpeed(i);
      if (tileSprites[i].tilePositionY <= -1 * this.getReelHeight(
        settings.NUMBER_OF_ENTITIES,
        settings.heightOfEntity,
      )) {
        tileSprites[i].tilePositionY = 0;
      }
    }
  }

  stopOnRequiredEntity(reel, coordinateY) {
    const previousPositionY = reel.tilePositionY;
    if (reel.tilePositionY !== coordinateY) {
      reel.tilePositionY -= this.minDecelerationSpeed;
      if (reel.tilePositionY < -1 * this.getReelHeight(
        settings.NUMBER_OF_ENTITIES,
        settings.heightOfEntity,
      )) {
        reel.tilePositionY = 0;
      }
    }
    if (previousPositionY >= coordinateY && reel.tilePositionY <= coordinateY) {
      reel.tilePositionY = coordinateY;
    }
  }

  deceleration(tileSprites, gameParameters, spinResult) {
    for (let i = 0; i < tileSprites.length; i++) {
      if (this.getDecelerationSpeed(i) === this.minDecelerationSpeed) {
        this.stopOnRequiredEntity(tileSprites[i],
          this.getCoordinateY(spinResult[i]));
        // eslint-disable-next-line no-continue
        continue;
      }
      tileSprites[i].tilePositionY -= this.getDecelerationSpeed(i);
      if (tileSprites[i].tilePositionY <= -1 * this.getReelHeight(
        settings.NUMBER_OF_ENTITIES,
        settings.heightOfEntity,
      )) {
        tileSprites[i].tilePositionY = 0;
      }
    }
  }
}
