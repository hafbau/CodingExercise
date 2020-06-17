import React, { useEffect, useState } from "react";
import axios from "axios";
import "./turtleverse.css";
// import path from './sample.json'

const DefaultTurtle = ({ top, left, color = "red" }) => {
  return (
    <div
      style={{
        borderRadius: "50%",
        backgroundColor: color,
        height: "1em",
        width: "1em",
        position: "absolute",
        zIndex: 10,
        top: top - 8,
        left: left - 8,
      }}
    ></div>
  );
};

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
    maxX = 0.5,
    minY = 0.5,
  } = {},
}) => {
  const step = Math.floor(height / gridHeight);
  const originFromTop = (height / gridHeight) * maxY;
  const originFromLeft = (width / gridWidth) * Math.abs(minX);
  console.log("step :>> ", step, originFromLeft, originFromTop);
  console.log("maxY", maxY);
  console.log("minX", minX);
  console.log("maxX", maxX);
  console.log("minY", minY);
  console.log("gridHeight", gridHeight);
  console.log("gridWidth", gridWidth);
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

      // setCoord({ top: ydistanceFromOrigin, left: xdistanceFromOrigin });
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
      <Turtle top={top} left={left} />
      <div className="zero-x" style={{ top: originFromTop }} />
      <div className="zero-y" style={{ left: originFromLeft }} />
      {revisitedTrail}
      <svg className="path" viewBox={`0 0 ${width} ${height}`}>
        <path
          d={`m ${originFromLeft},${originFromTop} ${visitedTrail.join(" ")}`}
          fill="transparent"
          stroke="black"
          stroke-width="4"
        ></path>
      </svg>
    </div>
  );
};
