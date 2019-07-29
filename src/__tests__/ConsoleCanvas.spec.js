import Position from '../Position';
import Cell from '../Cell';
import World from '../World';
import ConsoleCanvas from '../ConsoleCanvas';
import ViewPort from '../ViewPort';

describe('Console Canvas', () => {
  it('can render the world', () => {
    const glider = [
      new Position(1, 0),
      new Position(2, 1),
      new Position(0, 2),
      new Position(1, 2),
      new Position(2, 2),
    ];

    const world = new World();
    glider.forEach(position => world.seedCell(Cell.alive(), position));

    const canvas = new ConsoleCanvas();

    const viewPort = new ViewPort(new Position(-4, -4), new Position(5, 5));
    const view = canvas.print(world, viewPort);

    expect(view.length).toBe(10);
    expect(view).toMatchSnapshot();
  });
});
