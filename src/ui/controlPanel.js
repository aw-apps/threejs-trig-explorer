const FULL_CIRCLE_DEGREES = 360;

function normalizeDegrees(angleDegrees) {
  const normalized = angleDegrees % FULL_CIRCLE_DEGREES;
  return normalized >= 0 ? normalized : normalized + FULL_CIRCLE_DEGREES;
}

export function createControlPanel({
  onTogglePlay,
  onStep,
  onSpeedChange,
  onAngleChangeDegrees,
}) {
  const playToggle = document.getElementById("play-toggle");
  const stepAngle = document.getElementById("step-angle");
  const speedInput = document.getElementById("speed-input");
  const speedReadout = document.getElementById("speed-readout");
  const angleSlider = document.getElementById("angle-slider");
  const angleInput = document.getElementById("angle-input");
  const controlError = document.getElementById("control-error");

  if (
    !playToggle ||
    !stepAngle ||
    !speedInput ||
    !speedReadout ||
    !angleSlider ||
    !angleInput ||
    !controlError
  ) {
    throw new Error("Control panel elements are missing.");
  }

  function setError(message) {
    controlError.textContent = message;
  }

  function clearError() {
    setError("");
  }

  function handleAngleInput(value) {
    const parsed = Number.parseFloat(value);
    if (Number.isNaN(parsed)) {
      setError("Please enter a valid numeric angle.");
      return;
    }
    clearError();
    onAngleChangeDegrees(normalizeDegrees(parsed));
  }

  playToggle.addEventListener("click", onTogglePlay);
  stepAngle.addEventListener("click", onStep);
  speedInput.addEventListener("input", () => {
    const speed = Number.parseFloat(speedInput.value);
    speedReadout.textContent = `${speed.toFixed(2)}x`;
    onSpeedChange(speed);
  });
  angleSlider.addEventListener("input", () => {
    angleInput.value = angleSlider.value;
    handleAngleInput(angleSlider.value);
  });
  angleInput.addEventListener("change", () => {
    angleSlider.value = angleInput.value;
    handleAngleInput(angleInput.value);
  });

  return {
    setPlaying(isPlaying) {
      playToggle.textContent = isPlaying ? "Pause" : "Play";
    },
    setAngleDegrees(angleDegrees) {
      const normalized = normalizeDegrees(angleDegrees);
      angleSlider.value = normalized.toFixed(1);
      angleInput.value = normalized.toFixed(1);
    },
    setSpeed(speed) {
      speedInput.value = String(speed);
      speedReadout.textContent = `${speed.toFixed(2)}x`;
    },
    setError,
    clearError,
  };
}
