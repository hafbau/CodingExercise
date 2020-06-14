import React, { useEffect, useState } from 'react'
import './turtleverse.css'

const DefaultTurtle = ({
  top,
  left,
}) => {

  return (
    <div
      style={{
        borderRadius: '50%',
        backgroundColor: 'red',
        height: '1em',
        width: '1em',
        position: 'absolute',
        top,
        left,
      }}
    ></div>
  )
}

const step = 10;

export const TurtleVerse = ({
  height,
  width,
  turtle: Turtle = DefaultTurtle,
}) => {
  const path = [
    [0, 0],
    [0, 1],
    [-1, 1],
    [-1, -1],
  ];
  const [{ top, left }, setCoord] = useState({ top: height / 2, left: width / 2})
  const [visitedTrail, setVisitedTrail] = useState([]);
  useEffect(() => {
    const visitedTrail = path.map(([x, y], idx) => {
      x = x * step;
      y = y * step;
      setCoord(({ top, left }) => ({ top: top + x, left: left + y }));
      return (
        <div
          key={`${top}${left}-${idx}`}
          className="tiny-dot"
          style={{ top: top + x, left: left + y }}
        ><div></div></div>
      )
    });

    setVisitedTrail(visitedTrail);
  }, []);
  return (
    <div className='turtleverse' style={{ height, width }}>
      <Turtle
        top={top}
        left={left}
      />
      {visitedTrail}
    </div>
  )
}
