import CollisionError from './CollisionError';
import Position from './Position';
import Cell from './Cell';

class World {
  constructor() {
    this.grid = new Map();
  }

  get cells() {
    return Array.from(this.grid.values());
  }

  seed(cells) {
    cells.forEach((cell) => {
      this.seedCell(cell, this.emptyPositionInRange());
    });
  }

  tick() {
    const nextGeneration = new Map();
    this.grid.forEach((cell, position) => {
      const nextGenCell = new Cell();
      if (cell.isAnimate()) {
        nextGenCell.animate();
      }

      nextGenCell.addNeighbours(this.neighboursOf(Position.fromString(position)));
      nextGenCell.tick();
      nextGenCell.removeNeighbours();

      nextGeneration.set(position.toString(), nextGenCell);
    });

    this.grid = nextGeneration;
  }

  emptyPositionInRange() {
    let position;
    do {
      position = this.positionInRange();
    } while (this.grid.has(position.toString()));
    return position;
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

  positionInRange() {
    const x = Math.floor(Math.random() * 15);
    const y = Math.floor(Math.random() * 15);

    return new Position(x, y);
  }

  neighboursOf(position) {
    return [
      this.grid.get(position.topLeft().toString()) || Cell.dead(),
      this.grid.get(position.top().toString()) || Cell.dead(),
      this.grid.get(position.topRight().toString()) || Cell.dead(),

      this.grid.get(position.left().toString()) || Cell.dead(),
      this.grid.get(position.right().toString()) || Cell.dead(),

      this.grid.get(position.bottomLeft().toString()) || Cell.dead(),
      this.grid.get(position.bottom().toString()) || Cell.dead(),
      this.grid.get(position.bottomRight().toString()) || Cell.dead(),
    ];
  }
}

export default World;
