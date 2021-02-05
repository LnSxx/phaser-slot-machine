/* eslint-disable import/extensions */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
import Phaser from 'phaser';
import SlotMachine from './slotmachine.js';
import Animations from './animations.js';
import STATIC_FILES_BACKEND_URL from './settings.js';

const BUTTONS = {
  start: 'start',
  stop: 'stop',
};

const SLOT_MACHINE_STATES = {
  WAITING_FOR_START: 'WAITING_FOR_START',
  SPINNING: 'SPINNING',
  BEGINNING: 'BEGINNING',
};

const gameParameters = {
  numberOfWheels: 5,
  numberOfEntities: 3,
  heightOfEntity: 100,
  spinningTime: 10000,
  getReelHeight() {
    return this.numberOfEntities * this.heightOfEntity;
  },
};

const slotMachine = new SlotMachine(
  gameParameters.numberOfEntities,
  gameParameters.numberOfWheels,
  gameParameters.spinningTime,
);
const animations = new Animations();

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1600 },
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);

function getLocationX(index) {
  return index * 100 + 100;
}

function preload() {
  this.load.setBaseURL(STATIC_FILES_BACKEND_URL);
  this.load.image(BUTTONS.start, 'images/start_button.png');
  this.load.image(BUTTONS.stop, 'images/stop_button.png');
  this.load.image('reel', 'images/reel.png');
}

const reels = [];

let stopTaskId = null;

function startButtonHandler() {
  if (slotMachine.state !== SLOT_MACHINE_STATES.SPINNING) {
    clearTimeout(stopTaskId);
    animations.resetFrameCounter();
    slotMachine.startSpin();
    stopTaskId = setTimeout(stopButtonHandler, gameParameters.spinningTime);
  }
}

function stopButtonHandler() {
  if (slotMachine.state === SLOT_MACHINE_STATES.SPINNING) {
    animations.resetFrameCounter();
    slotMachine.stopSpin();
  }
}

function create() {
  const startButton = this.add.image(700, 200, BUTTONS.start);
  const stopButton = this.add.image(700, 400, BUTTONS.stop);
  for (let i = 0; i < gameParameters.numberOfWheels; i++) {
    reels.push(this.add.tileSprite(getLocationX(i), 300, 100, 300, 'reel'));
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

function update() {
  switch (slotMachine.state) {
    case SLOT_MACHINE_STATES.BEGINNING:
      animations.staticTileSprite(reels);
      break;
    case SLOT_MACHINE_STATES.WAITING_FOR_START:
      animations.countFrame();
      animations.deceleration(reels, gameParameters, slotMachine.result);
      break;
    case SLOT_MACHINE_STATES.SPINNING:
      animations.countFrame();
      animations.acceleration(reels, gameParameters);
      break;
    default:
      throw new Error('Invalid state');
  }
}
