import Position from './Position';

export default class ConsoleCanvas {
  print(world, viewPort) {
    const canvas = [];
    for (let { y } = viewPort.topLeft; y <= viewPort.bottomRight.y; y++) {
      const row = [];
      for (let { x } = viewPort.topLeft; x <= viewPort.bottomRight.x; x++) {
        const representation = world.cellAt(new Position(x, y)).isAnimate() ? 'o' : ' ';
        row.push(representation);
      }
      canvas.push(row);
    }

    return canvas;
  }
}
