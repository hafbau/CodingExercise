import React from 'react'
import './legend.css'
import { DefaultTurtle } from '../TurtleVerse/DefaultTurtle';

export const Legend = () => {
  return (
    <ul className='legend'>
      <li className='legend-item'>
        <div className='line'></div>
        <h6>Path travelled</h6>
      </li>
      <li className='legend-item'>
        <div className='tiny-dot'></div>
        <h6>Point revisited</h6>
      </li>
      <li className='legend-item'>
        <div className='start-point'>
          <DefaultTurtle opacity={0.5} />
        </div>
        <h6>Start Point</h6>
      </li>
      <li className='legend-item'>
        <div className='end-point'>
          <DefaultTurtle />
        </div>
        <h6>End point</h6>
      </li>
    </ul>
  )
}
