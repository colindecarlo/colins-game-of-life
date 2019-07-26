class Cell {
  constructor() {
    this.animated = false;
    this.neighbours = [];
  }

  static dead() {
    return new Cell;
  }

  tick() {
    if (this.neighbours.length == 3) {
      this.animate();
    }
  }

  isInanimate() {
    return this.animated == false;
  }

  animate() {
    this.animated = true;
  }

  addNeighbours(newNeighbours) {
    this.neighbours = [...this.neighbours, ...newNeighbours];
  }
}

export default Cell