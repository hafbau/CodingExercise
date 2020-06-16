const {
  createPathTree: defaultPTFactory,
  createPoint: defaultPointFactory
} = require('./helpers');

const ORIENTATIONS = {
  up: 'up',
  right: 'right',
  down: 'down',
  left: 'left',
}

const DIRECTION = {
  forward: 'F',
  clockwise: 'R',
  counterClockwise: 'L',
}

const ORIENTATION_MAP = [
  ORIENTATIONS.up,
  ORIENTATIONS.right,
  ORIENTATIONS.down,
  ORIENTATIONS.left,
]

module.exports = (direction, createPathTree = defaultPTFactory, createPoint = defaultPointFactory) => {
  const startingPoint = createPoint([0, 0, ORIENTATIONS.up])
  const turtleTravel = createPathTree(startingPoint);

  for (const move of direction) {
    const currentPos = makeMove(turtleTravel.endPoint.entries, move);
    const hasMoved = move === DIRECTION.forward;
    const point = createPoint(currentPos);
    turtleTravel.addPoint({
      point,
      hasMoved
    });
  }
  return turtleTravel;
}

const makeMove = (startingPoint, move) => {
  let [x, y, orientation] = startingPoint;
  if (move === DIRECTION.forward) {
    switch (orientation) {
      case ORIENTATIONS.up: {
        y++;
        break;
      }
      case ORIENTATIONS.right: {
        x++;
        break;
      }
      case ORIENTATIONS.down: {
        y--;
        break;
      }
      case ORIENTATIONS.left: {
        x--;
        break;
      }
    }
  } else {
    orientation = changeOrientation(orientation, move);
  }
  return [x, y, orientation];
}

const changeOrientation = (orientation, change) => {
  let currentOrientationIndex = ORIENTATION_MAP.indexOf(orientation);

  if (change === DIRECTION.clockwise) {
    currentOrientationIndex += 1;
    // folding backward
    currentOrientationIndex = currentOrientationIndex % ORIENTATION_MAP.length;
  }

  if (change === DIRECTION.counterClockwise) {
    currentOrientationIndex -= 1;
    // folding forward;
    currentOrientationIndex = currentOrientationIndex < 0 ?
      ORIENTATION_MAP.length - 1 :
      currentOrientationIndex;
  }
  return ORIENTATION_MAP[currentOrientationIndex];
}