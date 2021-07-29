// Variables
const path = [];
const drawn = [];

let currentOrder;

let slider;
let pausePlayButton;
let forwardButton;
let backwardButton;

let counter = 0;
let playing = false;

// Set up function
function setup() {
  colorMode(HSB, 360, 255, 255);
  // Set up DOM elements
  const c = createCanvas(800, 800);
  c.parent('#canvas-container');

  slider = createSlider(1, 8, 1, 1);
  slider.parent('#slider');

  pausePlayButton = createButton('Play');
  pausePlayButton.parent('#controls__play-pause');
  pausePlayButton.mousePressed(() => {
    playing = !playing;
    pausePlayButton.html(playing ? 'Pause' : 'Play');
  });

  backwardButton = createButton('◀');
  backwardButton.parent('#controls__forward-backward');
  backwardButton.mousePressed(() => {
    stepBackward();
  });

  forwardButton = createButton('▶');
  forwardButton.parent('#controls__forward-backward');
  forwardButton.mousePressed(() => {
    stepForward();
  });

  // Get points
  getCoordinates(2);

  currentOrder = 2;
}

// Draw loop
function draw() {
  // background();
  if (currentOrder !== +slider.value()) {
    getCoordinates(+slider.value());
    currentOrder = +slider.value();

    drawn.splice(0, drawn.length);
    counter = 0;
  }

  if (playing) {
    noFill();
    stroke(255);

    if (
      drawn.length < path.length &&
      frameCount % Math.floor(10 / currentOrder) === 0
    ) {
      for (
        let i = 0;
        i < Math.min(path.length - drawn.length, currentOrder * 2);
        i++
      ) {
        stepForward();
      }
    }
  } else if (drawn.length < 2) {
    textAlign(CENTER, CENTER);
    stroke(0);
    fill(255);
    textSize(40);
    textStyle(BOLD);
    text('Press play.', width / 2, height / 2);
  }

  stroke(255);
  strokeWeight(2);
  for (let i = 1; i < drawn.length; i++) {
    const hue =
      (map(i, 0, path.length, 0, 360) +
        (path.length === drawn.length ? frameCount % 360 : 0)) %
      360;
    stroke(hue, 255, 255);
    line(drawn[i - 1].x, drawn[i - 1].y, drawn[i].x, drawn[i].y);
  }
}

// Calculates the coordinates for hilbert curve
function getCoordinates(order) {
  document.getElementById('order-display').innerHTML = `Order: ${order}`;

  if (path.length) path.splice(0, path.length);

  const N = pow(2, order);

  for (let i = 0; i < pow(N, 2); i++) {
    const v = hilbert(i, order);

    path.push(v);
  }
}

// Adds a point to the drawn curve
function stepForward() {
  if (drawn.length < path.length) {
    drawn.push(path[counter++]);
  }
}

// Removes a point from the drawn curve
function stepBackward() {
  if (drawn.length > 0) {
    drawn.pop();
    counter--;
  }
}

// Converts a linear coordinate into a 2-dimensional coordinate
function hilbert(hindex, order) {
  const coordinates = [
    [0, 1],
    [0, 0],
    [1, 0],
    [1, 1],
  ];

  // Initially find where the node is in the first order curve
  const posInOrderOne = coordinates[hindex & 3];

  // Shift the bits over to see where it's in the next order
  let nextBits = hindex >>> 2;

  // Get the initial coordinates based on the position in the first order curve
  let x = posInOrderOne[0];
  let y = posInOrderOne[1];

  // Go through each higher order until they are all exhausted
  for (let o = 1; o < order; o++) {
    // The whole width of the particular order of the curve
    const length = Math.pow(2, o);

    // The position in that order
    const posInOrder = nextBits & 3;

    // TODO: change how the curves are rotated
    switch (posInOrder) {
      case 0: {
        // Bottom left (shift vertically & rotate right)
        const tmpX = length - 1 - x;
        x = length - 1 - y;
        y = tmpX + length;
        break;
      }
      case 1: // Top left
        break;
      case 2: // Top right (translate horizontally)
        x += length;
        break;
      case 3: {
        // Bottom right (rotate left, translate horizontally & vertically)
        const tmpX = x;
        x = y + length;
        y = tmpX + length;
        break;
      }
    }

    // Look at the next position
    nextBits = nextBits >>> 2;
  }

  // Return the translated vertex
  const N = pow(2, order);
  const len = width / N;

  const v = createVector(x, y);

  v.mult(len);
  v.add(len / 2, len / 2);

  return v;
}
