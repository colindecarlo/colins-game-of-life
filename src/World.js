import CollisionError from './CollisionError';
import Position from './Position';
import Cell from './Cell';
import ViewPort from './ViewPort';

class World {
  constructor(bottomRight) {
    this.grid = new Map();
    this.bottomRight = bottomRight;
  }

  get cells() {
    return Array.from(this.grid.values());
  }

  get boundaryPositions() {
    const viewPort = this.boundaries;
    const positions = [];

    // top & bottom row
    for (let { x } = viewPort.topLeft; x <= viewPort.bottomRight.x; x++) {
      positions.push(new Position(x, viewPort.topLeft.y), new Position(x, viewPort.bottomRight.y));
    }

    // left & right sides
    for (let { y } = viewPort.topLeft; y <= viewPort.bottomRight.y; y++) {
      positions.push(new Position(viewPort.topLeft.x, y), new Position(viewPort.bottomRight.x, y));
    }

    return positions;
  }

  get liveCellPositions() {
    return Array.from(this.grid.keys()).map(key => Position.fromString(key));
  }

  get boundaries() {
    const positions = Array.from(this.grid.keys(), position => Position.fromString(position));
    const toSmallest = (smallest, value) => Math.min(smallest, value);
    const toBiggest = (biggest, value) => Math.max(biggest, value);

    const topMost = positions.map(position => position.y).reduce(toSmallest);
    const leftMost = positions.map(position => position.x).reduce(toSmallest);
    const bottomMost = positions.map(position => position.y).reduce(toBiggest);
    const rightMost = positions.map(position => position.x).reduce(toBiggest);

    return new ViewPort(
      new Position(leftMost - 1, topMost - 1),
      new Position(rightMost + 1, bottomMost + 1),
    );
  }

  seed(cells) {
    cells.forEach((cell) => {
      this.seedCell(cell, this.emptyPositionInRange());
    });
  }

  tick() {
    const nextGeneration = new Map();
    const positionsOfInterest = new Set();

    this.boundaryPositions.forEach(position => positionsOfInterest.add(position.toString()));

    this.liveCellPositions
      .flatMap(position => [position, ...position.neighbouringPositions()])
      .forEach(position => positionsOfInterest.add(position.toString()));

    positionsOfInterest
      .forEach((foo) => {
        const position = Position.fromString(foo);
        this.tickCell(position.x, position.y, nextGeneration);
      });

    this.grid = nextGeneration;
  }

  tickCell(x, y, nextGeneration) {
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
    const initialWidth = Math.floor(this.bottomRight.x / 2);
    const initialheight = Math.floor(this.bottomRight.y / 2);
    const x = Math.floor(Math.random() * initialWidth) + Math.floor(initialWidth / 2);
    const y = Math.floor(Math.random() * initialheight) + Math.floor(initialheight / 2);

    return new Position(x, y);
  }

  neighboursOf(position) {
    const deadCell = Cell.dead();
    return [
      this.grid.get(position.topLeft().toString()) || deadCell,
      this.grid.get(position.top().toString()) || deadCell,
      this.grid.get(position.topRight().toString()) || deadCell,

      this.grid.get(position.left().toString()) || deadCell,
      this.grid.get(position.right().toString()) || deadCell,

      this.grid.get(position.bottomLeft().toString()) || deadCell,
      this.grid.get(position.bottom().toString()) || deadCell,
      this.grid.get(position.bottomRight().toString()) || deadCell,
    ];
  }
}

export default World;
