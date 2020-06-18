import React, { useState, useEffect } from 'react'

export const PointRevisited = ({ x, y, animationLength }) => {
  const [display, setDisplay] = useState('none');
  animationLength = animationLength * 6;// 6 is based off observation of the factor that works best
  useEffect(() => {
    const timeout = setTimeout(() => setDisplay('initial'), animationLength);
    return () => clearTimeout(timeout);
  }, [animationLength])
  return (
    <div
      className="tiny-dot"
      style={{
        // minus 2 because height and width are 4px in css and 50% offset makes it centralized
        top: y - 2,
        left: x - 2,
        display
      }}
    >
      <div></div>
    </div>
  )
};
