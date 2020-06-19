import React from 'react'

export const DefaultTurtle = ({ top = 8, left = 8, color = 'red', opacity = 1 }) => {
  return (
    <div
      className="turtle"
      style={{
        borderRadius: '50%',
        backgroundColor: color,
        height: '1em',
        width: '1em',
        zIndex: 10,
        top: top - 8,
        left: left - 8,
        opacity,
        transition: 'opacity 17s'
      }}
    ></div>
  );
};
