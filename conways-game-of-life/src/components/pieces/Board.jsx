// Imports
import React from 'react';

// App Imports
import Cell from './Cell';

import isMobile from '../../middleware/isMobileBrowser';

import './css/Board.css';

// Board component
export default function Board({
  onMouseDown,
  onMouseUp,
  onMouseEnter,
  cellSize,
  cells,
}) {
  return (
    <>
      {(!isMobile() && (
        <div className="board">
          {cells.map((row, r) => (
            <div key={r}>
              {row.map((colIsPopulated, c) => (
                <Cell
                  key={`${r},${c}`}
                  row={r}
                  col={c}
                  size={cellSize}
                  populated={colIsPopulated}
                  mouseDown={(row, col) => onMouseDown(row, col)}
                  mouseEnter={(row, col) => onMouseEnter(row, col)}
                  mouseUp={() => onMouseUp(false)}
                ></Cell>
              ))}
            </div>
          ))}
        </div>
      )) || (
        <h1>Sorry, but Conway's Game of Life doesn't work on mobile devices</h1>
      )}
    </>
  );
}
