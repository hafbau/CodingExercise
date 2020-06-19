import React, { useEffect, useState } from "react";
import { DefaultTurtle } from './DefaultTurtle';
import { PointRevisited } from './PointRevisited';
import "./turtleverse.css";
import { useSvgPathAnimation } from '../../hooks/animations';
import { useTurtleGrid } from '../../hooks/dimensions';


//This is used for stroke-dasharray animation
const ARBITRARILY_LARGE_NUMBER = 30000;
// size of full path * unit time it takes per second animation time
export const TurtleVerse = ({
  height,
  width,
  turtle: Turtle = DefaultTurtle,
  path = [],
  revisitedPoints = [],
  grid,
}) => {
  const [svgPathRef] = useSvgPathAnimation({ dependencies: [path.length]});
  const {
    originFromLeft,
    originFromTop,
    calculateDistanceFromOrigin
  } = useTurtleGrid(height, width, grid);
  
  
  const [{ top, left }, setCoord] = useState({
    top: originFromTop,
    left: originFromLeft,
  });

  const [visitedTrail, setVisitedTrail] = useState([]);
  useEffect(() => {
    const visitedTrail = path.map((coord) => {
      const [xdistanceFromOrigin, ydistanceFromOrigin] = calculateDistanceFromOrigin(coord)
      
      setCoord({ top: ydistanceFromOrigin, left: xdistanceFromOrigin });
      const svgPathLineCommandForCurrentCoord = `L ${xdistanceFromOrigin},${ydistanceFromOrigin}`;
      return svgPathLineCommandForCurrentCoord;
    });
    setVisitedTrail(visitedTrail);
  }, [path.length]);


  const [revisitedTrail, setRevisitedTrail] = useState([]);
  useEffect(() => {
    const revisitedTrail = revisitedPoints.map((coord, idx) => {
      const [xdistanceFromOrigin, ydistanceFromOrigin] = calculateDistanceFromOrigin(coord)
      return (
        <PointRevisited
          key={`${ydistanceFromOrigin}${xdistanceFromOrigin}-${idx}`}
          x={xdistanceFromOrigin}
          y={ydistanceFromOrigin}
          animationLength={{len: path.length, idx }}
        />
      )
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
          strokeDasharray={path.length + ARBITRARILY_LARGE_NUMBER}
          strokeDashoffset={path.length + ARBITRARILY_LARGE_NUMBER}
        ></path>
      </svg>
    </div>
  );
};
