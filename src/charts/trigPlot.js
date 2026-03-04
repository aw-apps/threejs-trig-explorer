const TWO_PI = Math.PI * 2;

export function createTrigPlot() {
  const canvas = document.getElementById("trig-plot");
  if (!canvas) {
    throw new Error("Trig plot canvas is missing.");
  }
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Failed to get 2D context for trig plot.");
  }

  const padding = 20;
  const visible = { sin: true, cos: true, tan: true };
  let angleRadians = 0;

  function xToCanvas(x) {
    return padding + (x / TWO_PI) * (canvas.width - padding * 2);
  }

  function yToCanvas(y) {
    return padding + ((2 - y) / 4) * (canvas.height - padding * 2);
  }

  function drawAxes() {
    context.strokeStyle = "#94a3b8";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(padding, yToCanvas(0));
    context.lineTo(canvas.width - padding, yToCanvas(0));
    context.moveTo(padding, yToCanvas(-2));
    context.lineTo(padding, yToCanvas(2));
    context.stroke();
  }

  function drawFunction(color, fn) {
    const samples = 360;
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.beginPath();
    for (let i = 0; i <= samples; i += 1) {
      const x = (i / samples) * TWO_PI;
      const y = Math.max(-2, Math.min(2, fn(x)));
      const canvasX = xToCanvas(x);
      const canvasY = yToCanvas(y);
      if (i === 0) {
        context.moveTo(canvasX, canvasY);
      } else {
        context.lineTo(canvasX, canvasY);
      }
    }
    context.stroke();
  }

  function drawTangentFunction() {
    const samples = 720;
    const asymptoteThreshold = 0.03;
    context.strokeStyle = "#f97316";
    context.lineWidth = 2;
    context.beginPath();

    let hasSegment = false;
    for (let i = 0; i <= samples; i += 1) {
      const x = (i / samples) * TWO_PI;
      const cosValue = Math.cos(x);
      if (Math.abs(cosValue) < asymptoteThreshold) {
        hasSegment = false;
        continue;
      }

      const y = Math.max(-2, Math.min(2, Math.tan(x)));
      const canvasX = xToCanvas(x);
      const canvasY = yToCanvas(y);
      if (!hasSegment) {
        context.moveTo(canvasX, canvasY);
        hasSegment = true;
      } else {
        context.lineTo(canvasX, canvasY);
      }
    }

    context.stroke();
  }

  function drawCursor() {
    context.strokeStyle = "#f59e0b";
    context.lineWidth = 1.5;
    context.beginPath();
    context.moveTo(xToCanvas(angleRadians), yToCanvas(-2));
    context.lineTo(xToCanvas(angleRadians), yToCanvas(2));
    context.stroke();
  }

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes();
    if (visible.sin) {
      drawFunction("#22c55e", Math.sin);
    }
    if (visible.cos) {
      drawFunction("#3b82f6", Math.cos);
    }
    if (visible.tan) {
      drawTangentFunction();
    }
    drawCursor();
  }

  draw();

  return {
    setAngle(nextAngleRadians) {
      angleRadians = ((nextAngleRadians % TWO_PI) + TWO_PI) % TWO_PI;
      draw();
    },
    setVisibility(functionVisibility) {
      visible.sin = functionVisibility.sin;
      visible.cos = functionVisibility.cos;
      visible.tan = functionVisibility.tan;
      draw();
    },
  };
}
