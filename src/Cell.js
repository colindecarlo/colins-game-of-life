class Cell {
  constructor() {
    this.animated = false;
    this.neighbours = [];
  }

  static dead() {
    return new Cell;
  }

  tick() {
    this.animate();
  }

  isDead() {
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