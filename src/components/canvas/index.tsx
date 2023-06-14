import { useEffect, useRef } from 'react';

function Canvas() {
  const canvas = useRef(null);

  useEffect(() => {
    if (!canvas.current) return;
    // The canvas is initially blank.
    // To display something, a script first needs to access the rendering context and draw on it.
    const ctx = canvas.current.getContext('2d');
    if (canvas.current.getContext) {
      //       ctx.fillStyle = 'green';
      //       ctx.fillRect(25, 25, 100, 100);
      //       ctx.clearRect(45, 45, 60, 60);
      //       ctx.strokeRect(50, 50, 50, 50);

      // Filled triangle
      ctx.beginPath();
      ctx.moveTo(25, 25);
      ctx.lineTo(105, 25);
      ctx.lineTo(25, 105);
      ctx.fill();

      // Stroked triangle
      ctx.beginPath();
      ctx.moveTo(125, 125);
      ctx.lineTo(125, 45);
      ctx.lineTo(45, 125);
      ctx.closePath();
      ctx.stroke();
    }
  }, [canvas.current]);

  return (
    <canvas
      style={{ outline: '1px solid gray' }}
      ref={canvas}
      width="300px"
      height="150px"
    />
  );
}

export default Canvas;
