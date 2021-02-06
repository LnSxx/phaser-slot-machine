/* eslint-disable import/extensions */
import Phaser from 'phaser';
import { SlotMachine } from './model.js';
import View from './view.js';
import Controller from './controller.js';
import settings from './settings.js';

const slotMachine = new SlotMachine(
  settings.NUMBER_OF_ENTITIES,
  settings.NUMBER_OF_WHEELS,
  settings.SPIN_TIME,
);

const view = new View(settings);
const controller = new Controller(view, slotMachine);

function preload() {
  controller.preload(this, settings.STATIC_FILES_BACKEND_URL);
}

function create() {
  controller.create(this);
}

function update() {
  controller.update();
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload,
    create,
    update,
  },
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
