import React, { useEffect, useState } from 'react'
import './turtleverse.css'
import path from './sample.json'

const DefaultTurtle = ({ top, left, color = 'red' }) => {
  return (
    <div
      style={{
        borderRadius: '50%',
        backgroundColor: color,
        height: '1em',
        width: '1em',
        position: 'absolute',
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
}) => {
  const step = height / 66;// height / (size + 2)
  console.log('step :>> ', step);
  const zeroTop = height * 0.9215686274509803;//0.0784313725490196
  const zeroLeft = width * 0.71875;

  const [{ top, left }, setCoord] = useState({ top: zeroTop, left: zeroLeft });
  const [visitedTrail, setVisitedTrail] = useState([]);

  useEffect(() => {
    const visitedTrail = path.map(([x, y], idx) => {
      x = x * step;
      y = y * step;
      setCoord({ top: zeroTop + x, left: zeroLeft + y });
      return (
        <div
          key={`${top}${left}-${idx}`}
          className='tiny-dot'
          style={{ top: zeroTop + x - 2, left: zeroLeft + y - 2 }}
        >
          <div></div>
        </div>
      );
    });

    setVisitedTrail(visitedTrail);
  }, []);
  return (
    <div className='turtleverse' style={{ height, width }}>
      <Turtle top={zeroTop} left={zeroLeft} color='#ff000080' />
      <Turtle top={top} left={left} />
      <div className='zero-x' style={{ top: zeroTop }} />
      <div className='zero-y' style={{ left: zeroLeft }} />
      {visitedTrail}
    </div>
  );
}
