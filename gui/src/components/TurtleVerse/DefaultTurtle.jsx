import React from 'react'

export const DefaultTurtle = ({ top, left, color = "red", opacity = 1 }) => {
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
        opacity,
        transition: 'opacity 17s'
      }}
    ></div>
  );
};
