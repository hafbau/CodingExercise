const createPathTree = (genesisPoint) => {
  // fullPath
  const fullPath = [
    [genesisPoint.x, genesisPoint.y],
  ];
  let minX = genesisPoint.x
  let maxX = genesisPoint.x
  let minY = genesisPoint.y
  let maxY = genesisPoint.y
  // unique visitedPoints - need this for lookup
  const visitedPoints = {
    [genesisPoint.path]: 1, // count
  };

  let endPoint = genesisPoint;
  return {
    endPoint,
    fullPath,
    visitedPoints,
    addPoint({
        point,
        hasMoved
      }) {
      if (hasMoved) {
        fullPath.push([point.x, point.y]);
        visitedPoints[point.path] = visitedPoints[point.path] ?
          visitedPoints[point.path] + 1 :
          1;

        if (minX > point.x) minX = point.x
        if (maxX < point.x) maxX = point.x
        if (minY > point.y) minY = point.y
        if (maxY < point.y) maxY = point.y
      }
      this.endPoint = point;
      return this.endPoint;
    },

    getGridProps() {
      const width = maxX - minX;
      const height = maxY - minY;
      return {
        minY,
        maxY,
        minX,
        maxX,
        width,
        height,
        size: width > height ? width : height,
        originY: minY / height,
        originX: minX / width,
      }
    },

    getRevisitedPoints() {
      return Object.entries(visitedPoints).reduce((revisitedPoints, [path, timesVisited]) => {
        if(timesVisited > 1) revisitedPoints.push(path);
        return revisitedPoints;
      }, [])
    }
  }
}

const createPoint = ([x, y, orientation]) => {
  return {
    entries: [x, y, orientation],
    path: `(${x}, ${y})`,
    orientation,
    x,
    y
  }
}

module.exports = {
  createPathTree,
  createPoint,
}