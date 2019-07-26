import World from '../World';
import Cell from '../Cell';
import CollisionError from '../CollisionError';
import Position from '../Position';

describe('World', () => {
  let world;

  beforeEach(() => {
    world = new World();
  });
  it('can be seeded with cells', () => {
    world.seed(Array.from({ length: 100 }).map(() => Cell.alive()));

    expect(world.cells).toHaveLength(100);
  });

  it('can seed a cell a specific position', () => {
    const cell = Cell.alive();
    world.seedCell(cell, new Position(25, 25));

    expect(world.cellAt(new Position(25, 25))).toBe(cell);
  });

  it('wont allow cells to be seeded in the same position', () => {
    const cell1 = Cell.alive();
    const cell2 = Cell.alive();

    world.seedCell(cell1, new Position(42, 42));
    expect(() => world.seedCell(cell2, new Position(42, 42))).toThrowError(CollisionError);
  });
});
