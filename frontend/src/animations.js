/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
export default class Animations {
  constructor() {
    this.frameCounter = 0;
    this.maxAccelerationSpeed = 30;
    this.minDecelerationSpeed = 10;
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

  getCoordinateY(numberOfEntity) {
    return -100 * numberOfEntity + 100;
  }

  staticTileSprite(tileSprites) {
    for (const reel of tileSprites) {
      reel.tilePositionY = 0;
    }
  }

  acceleration(tileSprites, gameParameters) {
    for (let i = 0; i < tileSprites.length; i++) {
      tileSprites[i].tilePositionY -= this.getAccelerationSpeed(i);
      if (tileSprites[i].tilePositionY <= -1 * gameParameters.getReelHeight()) {
        tileSprites[i].tilePositionY = 0;
      }
    }
  }

  stopOnRequiredEntity(reel, coordinateY, gameParameters) {
    const previousPositionY = reel.tilePositionY;
    if (reel.tilePositionY !== coordinateY) {
      reel.tilePositionY -= this.minDecelerationSpeed;
      if (reel.tilePositionY < -1 * gameParameters.getReelHeight()) {
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
          this.getCoordinateY(spinResult[i]), gameParameters);
        // eslint-disable-next-line no-continue
        continue;
      }
      tileSprites[i].tilePositionY -= this.getDecelerationSpeed(i);
      if (tileSprites[i].tilePositionY <= -1 * gameParameters.getReelHeight()) {
        tileSprites[i].tilePositionY = 0;
      }
    }
  }
}
