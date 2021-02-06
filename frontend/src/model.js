export const modelStates = {
  beginning: 'BEGINNING',
  waiting_for_start: 'WAITING_FOR_START',
  spinning: 'SPINNING',
};

export class SlotMachine {
  constructor(numberOfEntities, numberofLines, spinningTime) {
    this.numberOfEntities = numberOfEntities;
    this.numberofLines = numberofLines;
    this.spinningTime = spinningTime;
    this.state = modelStates.beginning;
    this.result = null;
  }

  getRandomNumber() {
    const rand = 1 + Math.random() * this.numberOfEntities;
    return Math.floor(rand);
  }

  getResult() {
    const resultArray = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.numberofLines; i++) {
      const randomNumber = this.getRandomNumber();
      resultArray.push(randomNumber);
    }

    return resultArray;
  }

  startSpin() {
    this.state = modelStates.spinning;
    this.result = this.getResult();
  }

  stopSpin() {
    this.state = modelStates.waiting_for_start;
  }
}
