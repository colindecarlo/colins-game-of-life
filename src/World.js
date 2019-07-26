import CollisionError from './CollisionError';
import Position from './Position';

class World {
  constructor() {
    this.grid = new Map();
  }

  seed(cells) {
    this.cells = cells;
  }

  seedCell(cell, position) {
    const key = position.toString();

    if (this.grid.has(key)) {
      throw new CollisionError(this.grid.get(key), cell);
    }

    this.grid.set(key, cell);
  }

  cellAt(position) {
    const key = position.toString();
    return this.grid.get(key);
  }
}

export default World;
