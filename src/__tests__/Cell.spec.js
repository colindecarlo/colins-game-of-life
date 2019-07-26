import Cell from "../Cell";

describe("Cell", () => {
  it('dead cells can be created', () => {
    const cell = Cell.dead();

    expect(cell.isDead()).toBe(true);
  })
});