import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './turtleverse.css'
// import path from './sample.json'

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
         path = [],
         grid: {
           height: gridHeight = 1,
           width: gridWidth = 1,
           maxY = 0.5,
           minX = 0.5,
           maxX = 0.5,
           minY = 0.5,
         } = {},
       }) => {
         const step = height / gridHeight;
         const zeroTop = step * maxY;
         const zeroLeft = (width / gridWidth) * Math.abs(minX);
         console.log("step :>> ", step, zeroLeft, zeroTop);
        console.log('maxY', maxY);
        console.log('minX', minX);
        console.log('maxX', maxX);
        console.log('minY', minY);
         const [{ top, left }, setCoord] = useState({
           top: zeroTop,
           left: zeroLeft,
         });
         const [visitedTrail, setVisitedTrail] = useState([]);

         useEffect(() => {
           const visitedTrail = path.map(([x, y], idx) => {
             x = x * step;
             y = y * step;
             setCoord({ top: zeroTop + x, left: zeroLeft + y });
             return (
               <div
                 key={`${top}${left}-${idx}`}
                 className="tiny-dot"
                 style={{ top: zeroTop + x - 2, left: zeroLeft + y - 2 }}
               >
                 <div></div>
               </div>
             );
           });

           setVisitedTrail(visitedTrail);
         }, [path.length]);
         return (
           <div className="turtleverse" style={{ height, width }}>
             <Turtle top={zeroTop} left={zeroLeft} color="#ff000080" />
             <Turtle top={top} left={left} />
             <div className="zero-x" style={{ top: zeroTop }} />
             <div className="zero-y" style={{ left: zeroLeft }} />
             {visitedTrail}
           </div>
         );
       };
