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
    return this.isAnimate()
      ? this.tickWhenAnimate()
      : this.tickWhenInanimate();
  }

  tickWhenAnimate() {
    if (!this.shouldDie()) {
      return;
    }

    this.die();
  }

  tickWhenInanimate() {
    if (!this.shouldLive()) {
      return;
    }

    this.animate();
  }

  has3LiveNeighbours() {
    return this.liveNeighbours.length === 3;
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

  hasLessThan2LiveNeighbours() {
    return this.liveNeighbours.length < 2;
  }

  get liveNeighbours() {
    return this.neighbours.filter(neighbour => neighbour.isAnimate());
  }

  hasMoreThan3LiveNeighbours() {
    return this.liveNeighbours.length > 3;
  }

  shouldDie() {
    return this.hasLessThan2LiveNeighbours() || this.hasMoreThan3LiveNeighbours();
  }

  shouldLive() {
    return this.has3LiveNeighbours();
  }
}

export default Cell;
