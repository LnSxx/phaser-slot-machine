/* eslint-disable import/extensions */
import settings from './settings.js';
import { modelStates } from './model.js';

export default class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.stopTaskId = null;
  }

  preload(scene, backendURL) {
    this.view.loadImages(scene, backendURL);
  }

  create(scene) {
    this.view.createWorld(
      scene,
      this.startButtonHandler.bind(this),
      this.stopButtonHandler.bind(this),
    );
  }

  startButtonHandler() {
    if (this.model.state !== modelStates.spinning) {
      clearTimeout(this.stopTaskId);
      this.view.resetFrameCounter();
      this.model.startSpin();
      this.stopTaskId = setTimeout(() => {
        this.stopButtonHandler();
      }, settings.SPIN_TIME);
    }
  }

  stopButtonHandler() {
    if (this.model.state === modelStates.spinning) {
      this.view.resetFrameCounter();
      this.model.stopSpin();
    }
  }

  update() {
    switch (this.model.state) {
      case modelStates.beginning:
        this.view.staticTileSprite(this.view.reels);
        break;
      case modelStates.waiting_for_start:
        this.view.countFrame();
        this.view.deceleration(this.view.reels, settings, this.model.result);
        break;
      case modelStates.spinning:
        this.view.countFrame();
        this.view.acceleration(this.view.reels, settings);
        break;
      default:
        throw new Error('Invalid state');
    }
  }
}
