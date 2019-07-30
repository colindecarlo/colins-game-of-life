import Position from './Position';

export default class HtmlCanvas {
  constructor(canvas) {
    this.context = canvas.getContext('2d');
    this.context.scale(5, 5);
  }

  print(world, viewPort) {
    for (let { y } = viewPort.topLeft; y <= viewPort.bottomRight.y; y++) {
      for (let { x } = viewPort.topLeft; x <= viewPort.bottomRight.x; x++) {
        const cell = world.cellAt(new Position(x, y));
        this.context.fillStyle = cell.isAnimate() ? 'black' : 'white';
        this.context.fillRect(x, y, 1, 1);
      }
    }
  }
}
