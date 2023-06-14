import { useEffect, useRef } from 'react';
const rect = {};
let drag = false;
let imageObj = null;

const ImageAnnotation = ({
  imageUrl = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg',
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    imageObj = new Image();
    imageObj.onload = function () {
      ctx.drawImage(imageObj, 0, 0);
    };
    imageObj.src = imageUrl;
  }, []);

  function mouseDown(e) {
    rect.startX = e.pageX - e.currentTarget.offsetLeft;
    rect.startY = e.pageY - e.currentTarget.offsetTop;
    drag = true;
  }

  function mouseUp() {
    drag = false;
  }

  function mouseMove(e) {
    if (drag) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, 500, 500);
      ctx.drawImage(imageObj, 0, 0);
      rect.w = e.pageX - e.currentTarget.offsetLeft - rect.startX;
      rect.h = e.pageY - e.currentTarget.offsetTop - rect.startY;
      ctx.strokeStyle = 'red';
      ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
    }
  }
  return (
    <canvas
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
      onMouseMove={mouseMove}
      ref={canvasRef}
      id="canvas"
      width="500"
      height="500"
    />
  );
};

export default ImageAnnotation;
