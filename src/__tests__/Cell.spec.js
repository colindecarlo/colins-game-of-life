import Cell from "../Cell";

describe("Cell", () => {
  describe("Inanimate Cells", () => {
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
      cell.addNeighbours(Array.from({length: 3}).map(_ => Cell.dead().animate()));

      cell.tick();

      expect(cell.isInanimate()).toBe(false);
    })

    it('stays inanimate when it has 2 live neighbors', () => {
      cell.addNeighbours(Array.from({length: 2}).map(_ => Cell.dead().animate()));

      cell.tick();

      expect(cell.isInanimate()).toBe(true);
    });

    it('stays inanimate when it has more than 3 live neighbors', () => {
      cell.addNeighbours(Array.from({length: 4}).map(_ => Cell.dead().animate()));

      cell.tick();

      expect(cell.isInanimate()).toBe(true);
    });
  })
});