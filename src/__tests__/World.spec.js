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

  it('seeds cells at random positions', () => {
    jest.spyOn(Math, 'random').mockImplementation((() => {
      const randomValues = [1 / 15, 2 / 15, 3 / 15, 4 / 15];
      let indexToReturn = 0;
      return () => randomValues[(indexToReturn++) % randomValues.length];
    })());

    const cell1 = Cell.alive();
    const cell2 = Cell.alive();

    world.seed([cell1, cell2]);

    expect(world.cellAt(new Position(1, 2))).toBe(cell1);
    expect(world.cellAt(new Position(3, 4))).toBe(cell2);
  });

  it('seeds cells at random positions without collisions', () => {
    jest.spyOn(Math, 'random').mockImplementation((() => {
      const randomValues = [1 / 15, 2 / 15, 1 / 15, 2 / 15, 3 / 15, 4 / 15];
      let indexToReturn = 0;
      return () => randomValues[(indexToReturn++) % randomValues.length];
    })());

    const cell1 = Cell.alive();
    const cell2 = Cell.alive();

    world.seed([cell1, cell2]);

    expect(world.cellAt(new Position(1, 2))).toBe(cell1);
    expect(world.cellAt(new Position(3, 4))).toBe(cell2);
  });

  it('can generate the next generation of the grid', () => {
    const glider = [
      new Position(1, 0),
      new Position(2, 1),
      new Position(0, 2),
      new Position(1, 2),
      new Position(2, 2),
    ];
    glider.forEach(position => world.seedCell(Cell.alive(), position));
    world.tick();

    expect(world.cellAt(new Position(0, 0)).isAnimate()).toBe(false);
    expect(world.cellAt(new Position(1, 0)).isAnimate()).toBe(false);
    expect(world.cellAt(new Position(2, 0)).isAnimate()).toBe(false);

    expect(world.cellAt(new Position(0, 1)).isAnimate()).toBe(true);
    expect(world.cellAt(new Position(1, 1)).isAnimate()).toBe(false);
    expect(world.cellAt(new Position(2, 1)).isAnimate()).toBe(true);

    expect(world.cellAt(new Position(0, 2)).isAnimate()).toBe(false);
    expect(world.cellAt(new Position(1, 2)).isAnimate()).toBe(true);
    expect(world.cellAt(new Position(2, 2)).isAnimate()).toBe(true);

    expect(world.cellAt(new Position(1, 3)).isAnimate()).toBe(true);

  });
});
