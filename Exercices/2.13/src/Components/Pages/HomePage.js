import { renderHeaderTitle } from '../../utils/render';

const EXPECTED_RECT_COUNT = 101;
const DEFAULT_SHAPE_SIDE = 20;
const DEFAULT_COLOR = 'blue'; // 'rgba(255,0,0,0.5)';

/**
 * WARNING : THE STROBOSCOPIC EFFECT OF THIS DEMO COULD LEAD TO EPILEPSY !!!
 * PLEASE DON'T EXECUTE THIS DEMO IF YOUR ARE SUBJECT TO EPILEPSY !
 */

const HomePage = () => {
  const main = document.querySelector('main');
  const mainWidth = main.clientWidth;
  const mainHeight = main.clientHeight;
  let canvas;
  let canvasContext;
  let animationID;
  let isAnimated = true;
  let animationColor = DEFAULT_COLOR;
  let squareSide = DEFAULT_SHAPE_SIDE;

  renderHeaderTitle('Canvas Animation');
  renderCanvasWrapper();
  setCanvasContextAndSize();
  removePotentialVerticalAndHorizontalScrollbars();
  animationID = requestAnimationFrame(drawOneFrame);
  document.addEventListener('keydown', onKeyPressed);
  canvas.addEventListener('click', onCanvasClick);
  main.addEventListener('contextmenu', onRightClick);

  function renderCanvasWrapper() {
    main.innerHTML = '<canvas />';
    canvas = document.querySelector('canvas');
  }

  function setCanvasContextAndSize() {
    canvasContext = canvas.getContext('2d');
    canvas.width = mainWidth;
    canvas.height = mainHeight;
  }

  /**
   * This function remove the vertical scrollbar that spuriously appears
   * even though the canvas is not meant to extend beyond the height
   * of the browser windows.
   */
  function removePotentialVerticalAndHorizontalScrollbars() {
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';
  }

  function drawOneFrame(color) {
    clearFrame();

    drawRectanglesAtRandomLocations(color);
    // drawAlwaysFullRectanglesAtRandomLocations();

    animationID = requestAnimationFrame(drawOneFrame);

    // requestAnimationFrame(() => setTimeout(drawOneFrame, 1000));
  }

  function clearFrame() {
    canvasContext.clearRect(0, 0, mainWidth, mainHeight);
  }

  function drawRectanglesAtRandomLocations() {
    canvasContext.fillStyle = animationColor;

    for (let i = 0; i < EXPECTED_RECT_COUNT; i += 1) {
      canvasContext.fillRect(
        Math.random() * mainWidth,
        Math.random() * mainHeight,
        squareSide,
        squareSide,
      );
    }
  }

  function onKeyPressed(e) {
    const keyName = e.code;

    if (keyName === 'NumpadAdd') {
      squareSide += 5;
    } else if (keyName === 'NumpadSubtract') {
      if (squareSide === 0) return;
      squareSide -= 5;
    }
  }

  function onCanvasClick() {
    isAnimated = !isAnimated;
    if (!isAnimated) {
      cancelAnimationFrame(animationID);
    } else {
      requestAnimationFrame(drawOneFrame);
    }
  }

  function onRightClick(e) {
    e.preventDefault();

    animationColor = getRandomRgbaColorAsString();
  }

  function getRandomRgbaColorAsString() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgba(${red},${green},${blue},1)`;
  }
};

export default HomePage;
