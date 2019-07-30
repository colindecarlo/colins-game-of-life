export default class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static fromString(position) {
    const coords = /\((-?\d+), (-?\d+)\)/.exec(position);
    if (!coords) {
      console.log({ position });
    }
    return new Position(coords[1], coords[2]);
  }

  topLeft() {
    return new Position(this.x - 1, this.y - 1);
  }

  top() {
    return new Position(this.x, this.y - 1);
  }

  topRight() {
    return new Position(this.x + 1, this.y - 1);
  }

  left() {
    return new Position(this.x - 1, this.y);
  }

  right() {
    return new Position(this.x + 1, this.y);
  }

  bottomLeft() {
    return new Position(this.x - 1, this.y + 1);
  }

  bottom() {
    return new Position(this.x, this.y + 1);
  }

  bottomRight() {
    return new Position(this.x + 1, this.y + 1);
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}
