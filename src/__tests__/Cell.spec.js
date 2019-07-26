import Cell from '../Cell';

describe('Cell', () => {
  const identity = cell => cell;

  function makeNeighbours(numberOfNeighbours, cb = identity) {
    return Array.from({ length: numberOfNeighbours }).map(() => {
      const cell = Cell.dead();
      cb(cell);
      return cell;
    });
  }

  describe('Inanimate Cells', () => {
    const animateCell = cell => cell.animate();

    let cell;

    beforeEach(() => {
      cell = Cell.dead();
    });

    it('is inanimate when it is created', () => {
      expect(cell.isInanimate()).toBe(true);
    });

    it('can be animated', () => {
      cell.animate();

      expect(cell.isInanimate()).toBe(false);
    });

    it('becomes animated when it has 3 live neighbors', () => {
      cell.addNeighbours(makeNeighbours(3, animateCell));

      cell.tick();

      expect(cell.isInanimate()).toBe(false);
    });

    it('stays inanimate when it has 2 live neighbors', () => {
      cell.addNeighbours(makeNeighbours(2, animateCell));

      cell.tick();

      expect(cell.isInanimate()).toBe(true);
    });

    it.each([4, 5, 6, 7, 8])('stays inanimate when it has more than 3 live neighbors', (numberOfNeighbours) => {
      cell.addNeighbours(makeNeighbours(numberOfNeighbours, animateCell));

      cell.tick();

      expect(cell.isInanimate()).toBe(true);
    });

    it('stays dead when it has 3 dead neighbours', () => {
      cell.addNeighbours(makeNeighbours(3));

      cell.tick();

      expect(cell.isInanimate()).toBe(true);
    });
  });

  describe('Animate Cells', () => {
    it('can be created as an animate cell', () => {
      const cell = Cell.alive();

      expect(cell.isAnimate()).toBe(true);
    });
  });

  it('dies when it has only 1 live neighbour', () => {
    const cell = Cell.alive();
    cell.addNeighbours(makeNeighbours(1, neighbour => neighbour.animate()));

    cell.tick();

    expect(cell.isInanimate()).toBe(true);
  });

  it('stays alive when it has 2 live neighbours', () => {

  });
});
