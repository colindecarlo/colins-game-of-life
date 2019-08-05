import Position from './Position';

export default class HtmlCanvas {
  constructor(canvas, gridSize, scale) {
    this.lastPrint = new Set();

    canvas.height = scale * gridSize;
    canvas.width = scale * gridSize;

    this.context = canvas.getContext('2d');
    this.context.scale(scale, scale);
  }

  print(world) {
    const currentPrint = [...world.grid.keys()];

    // don't need to redraw the intersect of the lastPrint and this print
    const stillPrinted = new Set(currentPrint.filter(position => this.lastPrint.has(position)));

    // need to draw the current print minus the last print
    const toPrint = new Set(currentPrint.filter(position => !stillPrinted.has(position)));

    // need to clear the last print minus the current print
    const toClear = [...this.lastPrint].filter(position => !stillPrinted.has(position));

    this.render(toPrint, 'black');
    this.render(toClear, 'white');

    this.lastPrint = new Set(currentPrint);
  }

  render(toPrint, color) {
    this.context.fillStyle = color;
    Array.from(toPrint, position => Position.fromString(position))
      .forEach(position => this.context.fillRect(position.x, position.y, 1, 1));
  }
}
