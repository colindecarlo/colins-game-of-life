class CollisionError {
  constructor(residingCell, collidingCell) {
    this.collidingCell = collidingCell;
    this.residingCell = residingCell;
  }
}

export default CollisionError;
