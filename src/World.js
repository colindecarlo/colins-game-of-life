import CollisionError from './CollisionError';
import Position from './Position';
import Cell from './Cell';
import ViewPort from './ViewPort';

class World {
  constructor() {
    this.grid = new Map();
  }

  get cells() {
    return Array.from(this.grid.values());
  }

  get boundaries() {
    const positions = Array.from(this.grid.keys(), position => Position.fromString(position));
    const toSmallest = (smallest, value) => Math.min(smallest, value);
    const toBiggest = (biggest, value) => Math.max(biggest, value);

    const topMost = positions.map(position => position.y).reduce(toSmallest);
    const leftMost = positions.map(position => position.x).reduce(toSmallest);
    const bottomMost = positions.map(position => position.y).reduce(toBiggest);
    const rightMost = positions.map(position => position.x).reduce(toBiggest);

    return new ViewPort(new Position(leftMost - 1, topMost - 1), new Position(rightMost + 1, bottomMost + 1));
  }

  seed(cells) {
    cells.forEach((cell) => {
      this.seedCell(cell, this.emptyPositionInRange());
    });
  }

  tick() {
    const nextGeneration = new Map();
    const viewPort = this.boundaries;
    for (let { y } = viewPort.topLeft; y <= viewPort.bottomRight.y; y++) {
      for (let { x } = viewPort.topLeft; x <= viewPort.bottomRight.x; x++) {
        const position = new Position(x, y);
        const cell = this.cellAt(position);

        const nextGenCell = new Cell();
        if (cell.isAnimate()) {
          nextGenCell.animate();
        }

        nextGenCell.addNeighbours(this.neighboursOf(position));
        nextGenCell.tick();
        nextGenCell.removeNeighbours();

        if (nextGenCell.isAnimate()) {
          nextGeneration.set(position.toString(), nextGenCell);
        }
      }
    }

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
    return this.grid.get(key) || Cell.dead();
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
