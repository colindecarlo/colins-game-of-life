class Cell {
  constructor() {
    this.animated = false;
    this.neighbours = [];
  }

  static dead() {
    return new Cell;
  }

  tick() {
    if (this.has3LiveNeighbours()) {
      this.animate();
    }
  }

  has3LiveNeighbours() {
    if (this.neighbours.length != 3) {
      return false;
    }

    return this.neighbours.every(neighbour => neighbour.isAnimate());
  }

  isInanimate() {
    return this.animated == false;
  }

  isAnimate() {
    return this.animated == true;
  }

  animate() {
    this.animated = true;
  }

  addNeighbours(newNeighbours) {
    this.neighbours = [...this.neighbours, ...newNeighbours];
  }
}

export default Cell