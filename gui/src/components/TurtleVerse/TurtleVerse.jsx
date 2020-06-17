import React, { useEffect, useState } from "react";
import { DefaultTurtle } from './DefaultTurtle';
import "./turtleverse.css";
import { useSvgPathAnimation } from '../../hooks/animations';

export const TurtleVerse = ({
  height,
  width,
  turtle: Turtle = DefaultTurtle,
  path = [],
  revisitedPoints = [],
  grid: {
    height: gridHeight = 1,
    width: gridWidth = 1,
    maxY = 0.5,
    minX = 0.5,
  } = {},
}) => {
  const svgPathRef = useSvgPathAnimation({ dependencies: [path.length]});
  const step = Math.floor(height / gridHeight);
  const originFromTop = (height / gridHeight) * maxY;
  const originFromLeft = (width / gridWidth) * Math.abs(minX);

  
  
  const [{ top, left }, setCoord] = useState({
    top: originFromTop,
    left: originFromLeft,
  });

  const [visitedTrail, setVisitedTrail] = useState([]);
  const [revisitedTrail, setRevisitedTrail] = useState([]);

  useEffect(() => {
    const visitedTrail = path.map(([xCoord, yCoord], idx) => {
      const x = xCoord * step;
      const y = yCoord * step;
      const ydistanceFromOrigin = originFromTop - y;
      const xdistanceFromOrigin = originFromLeft + x;

      setCoord({ top: ydistanceFromOrigin, left: xdistanceFromOrigin });
      return `L ${xdistanceFromOrigin},${ydistanceFromOrigin}`;
    });

    setVisitedTrail(visitedTrail);
  }, [path.length]);

  useEffect(() => {
    const revisitedTrail = revisitedPoints.map(([xCoord, yCoord], idx) => {
      const x = xCoord * step;
      const y = yCoord * step;
      const ydistanceFromOrigin = originFromTop - y;
      const xdistanceFromOrigin = originFromLeft + x;

      return (
        <div
          key={`${top}${left}-${idx}`}
          className="tiny-dot"
          style={{
            top: ydistanceFromOrigin - 2,
            left: xdistanceFromOrigin - 2,
          }}
        >
          <div></div>
        </div>
      );
    });

    setRevisitedTrail(revisitedTrail);
  }, [revisitedPoints.length]);

  return (
    <div className="turtleverse" style={{ height, width }}>
      <Turtle top={originFromTop} left={originFromLeft} color="#ff000080" />
      <Turtle top={top} left={left} opacity={top === originFromTop ? 0 : 1}/>
      <div className="zero-x" style={{ top: originFromTop }} />
      <div className="zero-y" style={{ left: originFromLeft }} />
      {revisitedTrail}
      <svg viewBox={`0 0 ${width} ${height}`}>
        <path
          ref={svgPathRef}
          d={`m ${originFromLeft},${originFromTop} ${visitedTrail.join(" ")}`}
          fill="transparent"
          stroke="black"
          strokeWidth="4"
          strokeDasharray={30000}
          strokeDashoffset={30000}
        ></path>
      </svg>
    </div>
  );
};
