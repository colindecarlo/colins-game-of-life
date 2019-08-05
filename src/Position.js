export default class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static fromString(position) {
    const coords = /\((-?\d+), (-?\d+)\)/.exec(position);
    return new Position(parseInt(coords[1], 10), parseInt(coords[2], 10));
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

  neighbouringPositions() {
    return [
      this.topLeft(),
      this.top(),
      this.topRight(),

      this.left(),
      this.right(),

      this.bottomLeft(),
      this.bottom(),
      this.bottomRight(),
    ];
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}
