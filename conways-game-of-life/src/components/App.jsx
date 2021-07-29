// Imports
import React, { useState, useEffect } from 'react';

// App Imports
import Board from './pieces/Board';
import Header from './partials/Header/Header';
import './css/App.css';

// Constants
const cellSize = 15;

// App component
export default function App() {
  // Two dimensional array of booleans
  const [cells, setCells] = useState(() => generateCells());
  const [speed, setSpeed] = useState(100);
  const [isSimulating, setIsSimulating] = useState(false);
  const [mousePressed, setMousePressed] = useState(false);
  const [palette, setPalette] = useState(true);
  const [timeoutId, setTimeoutId] = useState(-1);

  useEffect(() => {
    if (isSimulating) {
      setTimeoutId(
        setTimeout(() => {
          animate();
        }, speed)
      );
    }

    function countPopNeighbors(row, col) {
      let popNeighbors = 0;

      for (let rowOff = -1; rowOff <= 1; rowOff++) {
        const relRow = row + rowOff;

        if (relRow >= 0 && relRow < cells.length)
          for (let colOff = -1; colOff <= 1; colOff++) {
            const relCol = col + colOff;

            if (
              relCol >= 0 &&
              relCol < cells[relRow].length &&
              !(rowOff === 0 && colOff === 0) &&
              cells[relRow][relCol]
            ) {
              popNeighbors++;
            }
          }
      }

      return popNeighbors;
    }

    function animate() {
      const nextFrame = [];

      for (let row = 0; row < cells.length; row++) {
        nextFrame.push([]);
        for (let col = 0; col < cells[row].length; col++) {
          const popNeighbors = countPopNeighbors(row, col);

          if (
            (!cells[row][col] && popNeighbors === 3) ||
            (cells[row][col] && popNeighbors >= 2 && popNeighbors <= 3)
          ) {
            nextFrame[row].push(true);
          } else {
            nextFrame[row].push(false);
          }
        }
      }

      setCells(nextFrame);
    }
  }, [setCells, setIsSimulating, setTimeoutId, speed, cells, isSimulating]);

  function calcRowsCols() {
    const windowHeight = window.innerHeight - 98; // Subtracting the height of the header

    const rows = Math.floor(windowHeight / cellSize);
    const cols = Math.floor(window.innerWidth / cellSize);

    return { rows, cols };
  }

  function generateCells() {
    const { rows, cols } = calcRowsCols();
    const tmpCells = [];

    for (let r = 0; r < rows; r++) {
      tmpCells.push(Array(cols).fill(false));
    }

    return tmpCells;
  }

  function flipCell(row, col, populated = palette) {
    const tmpCells = cells.slice();

    tmpCells[row][col] = populated;

    setCells(tmpCells);
  }

  function handleMouseDown(row, col) {
    if (isSimulating) return;

    setMousePressed(true);

    const curCellStatus = cells[row][col];

    if (palette === curCellStatus) {
      setPalette(!curCellStatus);
    }

    // An explicit value for `populated` is passed in because palette isn't guarenteed to be updated by the time flipCell is called
    flipCell(row, col, !curCellStatus);
  }

  function handleMouseEnter(row, col) {
    if (isSimulating || !mousePressed) return;

    flipCell(row, col);
  }

  function resetCells() {
    clearTimeout(timeoutId);

    setIsSimulating(false);

    setCells(generateCells());
  }

  function handleSpeedChange(speed) {
    setSpeed(speed);
    clearTimeout(timeoutId);
  }

  return (
    <>
      <Header
        isSimulating={isSimulating}
        onPressPlay={() => setIsSimulating(!isSimulating)}
        onPressReset={() => resetCells()}
        onChangeSpeed={speed => handleSpeedChange(speed)}
      />
      <Board
        onMouseDown={(row, col) => handleMouseDown(row, col)}
        onMouseUp={() => setMousePressed(false)}
        onMouseEnter={(row, col) => handleMouseEnter(row, col)}
        cellSize={cellSize}
        cells={cells}
      />
    </>
  );
}
