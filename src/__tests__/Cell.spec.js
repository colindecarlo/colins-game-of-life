import Cell from '../Cell';

describe('Cell', () => {
  const identity = cell => cell;
  const animateCell = cell => cell.animate();

  function makeNeighbours(numberOfNeighbours, cb = identity) {
    return Array.from({ length: numberOfNeighbours }).map(() => {
      const cell = Cell.dead();
      cb(cell);
      return cell;
    });
  }

  describe('Inanimate Cells', () => {
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
    let cell;
    beforeEach(() => {
      cell = Cell.alive();
    });

    it('can be created as an animate cell', () => {
      expect(cell.isAnimate()).toBe(true);
    });

    it('dies when it has only 1 live neighbour', () => {
      cell.addNeighbours(makeNeighbours(1, animateCell));

      cell.tick();

      expect(cell.isInanimate()).toBe(true);
    });

    it('dies when it has no live neighbours', () => {
      cell.tick();

      expect(cell.isInanimate()).toBe(true);
    });

    it('stays alive when it has 2 live neighbours', () => {
      cell.addNeighbours(makeNeighbours(2, animateCell));

      cell.tick();

      expect(cell.isAnimate()).toBe(true);
    });

    it('stays alive when it has 3 live neighbours', () => {
      cell.addNeighbours(makeNeighbours(3, animateCell));

      cell.tick();

      expect(cell.isAnimate()).toBe(true);
    });

    it.each([4, 5, 6, 7, 8])('dies when it more than 3 live neighbours', (numberOfNeighbours) => {
      cell.addNeighbours(makeNeighbours(numberOfNeighbours, animateCell));

      cell.tick();

      expect(cell.isInanimate()).toBe(true);
    });
  });
});
