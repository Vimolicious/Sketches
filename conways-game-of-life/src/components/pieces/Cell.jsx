// Imports
import React from 'react';

// App Imports
import './css/Cell.css';

// Cell component
export default function Cell({
  row,
  col,
  populated,
  mouseDown,
  mouseEnter,
  mouseUp,
  size,
}) {
  return (
    <div
      className={`node${populated ? ' populated' : ''}`}
      style={{ width: size, height: size }}
      onMouseDown={() => mouseDown(row, col)}
      onMouseEnter={() => mouseEnter(row, col)}
      onMouseUp={() => mouseUp()}
    ></div>
  );
}
