import World from './World';
import Position from './Position';
import Cell from './Cell';
import ViewPort from './ViewPort';
import HtmlCanvas from './HtmlCanvas';

const canvasScale = 5;
const gridSize = 200;

const bottomRight = new Position(gridSize - 1, gridSize - 1);
const world = new World(bottomRight);
const glider = [
  new Position(1, 0),
  new Position(2, 1),
  new Position(0, 2),
  new Position(1, 2),
  new Position(2, 2),
];
glider.forEach(position => world.seedCell(Cell.alive(), position));

world.seed(Array.from({ length: (gridSize * gridSize / 4) }, () => Cell.alive()));

const canvasEl = document.getElementById('the-canvas');

const viewport = new ViewPort(
  new Position(0, 0),
  bottomRight,
);
console.log(viewport);

const canvas = new HtmlCanvas(canvasEl, gridSize, canvasScale);

console.log({
  world,
  canvas,
  viewport,
});

canvas.print(world, viewport);
let frame = null;
document.getElementById('start-btn').addEventListener('click', () => {
  const draw = () => {
    world.tick();
    canvas.print(world, viewport);
    frame = requestAnimationFrame(draw);
  };
  draw();
});

document.getElementById('stop-btn').addEventListener('click', () => {
  cancelAnimationFrame(frame);
});

document.getElementById('tick-btn').addEventListener('click', () => {
  world.tick();
  canvas.print(world, viewport);
  // clearInterval(interval);
});
