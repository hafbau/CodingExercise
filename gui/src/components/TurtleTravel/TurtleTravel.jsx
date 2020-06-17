import React, { useState } from 'react'
import { TurtleVerse } from '../TurtleVerse';
import { Uploader } from '../Uploader';
import './turtletravel.css'

export const TurtleTravel = () => {
  const [{ fullPath, grid, revisitedPoints }, setPathData] = useState({})
  
  return (
    <section className='turletravel'>
      <Uploader onUploadResponse={({ result }) => setPathData(result)} />
      <TurtleVerse
        width={960}
        height={640}
        path={fullPath}
        grid={grid}
        revisitedPoints={revisitedPoints}
      />
    </section>
  );
}
