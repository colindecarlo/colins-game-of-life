class Cell {
  constructor() {
    this.animated = false;
    this.neighbours = [];
  }

  static dead() {
    return new Cell();
  }

  static alive() {
    const cell = new Cell();
    cell.animate();

    return cell;
  }

  tick() {
    if (this.has3LiveNeighbours()) {
      this.animate();
    }

    if (this.hasOnlyOneLiveNeighbour()) {
      this.die();
    }
  }

  has3LiveNeighbours() {
    if (this.neighbours.length !== 3) {
      return false;
    }

    return this.neighbours.every(neighbour => neighbour.isAnimate());
  }

  isInanimate() {
    return this.animated === false;
  }

  isAnimate() {
    return this.animated === true;
  }

  animate() {
    this.animated = true;
  }

  addNeighbours(newNeighbours) {
    this.neighbours = [...this.neighbours, ...newNeighbours];
  }


  die() {
    this.animated = false;
  }

  hasOnlyOneLiveNeighbour() {
    if (this.neighbours.length === 0) {
      return false;
    }

    return this.neighbours.filter(neighbour => neighbour.isAnimate()).length === 1;
  }
}

export default Cell;
