import Cell from "../Cell";

describe("Cell", () => {
  it('is dead when it is created', () => {
    const cell = Cell.dead();

    expect(cell.isInanimate()).toBe(true);
  });

  it('can be animated', () => {
    const cell = Cell.dead();

    cell.animate();

    expect(cell.isInanimate()).toBe(false);
  });

  it('becomes animated when it has 3 live neighbors', () => {
    const cell = Cell.dead();
    cell.addNeighbours(Array.from({ length: 3}).map(_ => Cell.dead().animate()));

    cell.tick();

    expect(cell.isInanimate()).toBe(false);
  })
});