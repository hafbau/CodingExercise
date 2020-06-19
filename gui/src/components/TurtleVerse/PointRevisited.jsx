import React, { useState, useEffect } from 'react'

export const PointRevisited = ({ x, y, animationLength: { len, idx } }) => {
  const [display, setDisplay] = useState('none');
  // an algorithm should be derived for the below
  const animationLength = idx * ( len < 500 ? 100 : (len < 1000 ? 75 : (len < 2100 ? 50 : 35)));
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
