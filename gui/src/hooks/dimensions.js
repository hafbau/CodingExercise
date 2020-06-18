import React from 'react';

export const useTurtleGrid = (height, width, {
  height: gridHeight = 1,
  width: gridWidth = 1,
  maxY = 0.5,
  minX = 0.5,
} = {}) => {

  const step = React.useMemo(() => Math.floor(height / gridHeight), [height, gridHeight]);
  const originFromTop = React.useMemo(
    () => (height / gridHeight) * maxY,
    [height, gridHeight, maxY]
  );
  
  const originFromLeft = React.useMemo(
    () => (width / gridWidth) * Math.abs(minX),
    [width, gridWidth, minX]
  );

  const calculateDistanceFromOrigin = React.useCallback(([xCoord, yCoord]) => {
    const x = xCoord * step;
    const y = yCoord * step;
    const ydistanceFromOrigin = originFromTop - y;
    const xdistanceFromOrigin = originFromLeft + x;
    return [xdistanceFromOrigin, ydistanceFromOrigin]
  }, [step, originFromLeft, originFromTop]);

  return {
    step,
    originFromLeft,
    originFromTop,
    calculateDistanceFromOrigin
  }
}