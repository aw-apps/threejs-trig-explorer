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
  onFunctionToggle,
}) {
  const playToggle = document.getElementById("play-toggle");
  const stepAngle = document.getElementById("step-angle");
  const speedInput = document.getElementById("speed-input");
  const speedReadout = document.getElementById("speed-readout");
  const angleSlider = document.getElementById("angle-slider");
  const angleInput = document.getElementById("angle-input");
  const toggleSin = document.getElementById("toggle-sin");
  const toggleCos = document.getElementById("toggle-cos");
  const toggleTan = document.getElementById("toggle-tan");
  const controlError = document.getElementById("control-error");

  if (
    !playToggle ||
    !stepAngle ||
    !speedInput ||
    !speedReadout ||
    !angleSlider ||
    !angleInput ||
    !toggleSin ||
    !toggleCos ||
    !toggleTan ||
    !controlError
  ) {
    throw new Error("Control panel elements are missing.");
  }

  function setError(message) {
    controlError.textContent = message;
    angleInput.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function clearError() {
    setError("");
  }

  function handleAngleInput(value) {
    const rawValue = String(value).trim();
    if (rawValue.length === 0) {
      setError("Angle is required.");
      return;
    }

    const parsed = Number.parseFloat(value);
    if (!Number.isFinite(parsed)) {
      setError("Please enter a finite numeric angle.");
      return;
    }

    clearError();
    const normalized = normalizeDegrees(parsed);
    angleSlider.value = normalized.toFixed(1);
    angleInput.value = normalized.toFixed(1);
    onAngleChangeDegrees(normalized);
  }

  playToggle.addEventListener("click", onTogglePlay);
  stepAngle.addEventListener("click", onStep);
  speedInput.addEventListener("input", () => {
    const speed = Number.parseFloat(speedInput.value);
    speedReadout.textContent = `${speed.toFixed(2)}x`;
    onSpeedChange(speed);
  });
  angleSlider.addEventListener("input", () => {
    handleAngleInput(angleSlider.value);
  });
  angleInput.addEventListener("change", () => {
    handleAngleInput(angleInput.value);
  });
  toggleSin.addEventListener("change", () => onFunctionToggle("sin", toggleSin.checked));
  toggleCos.addEventListener("change", () => onFunctionToggle("cos", toggleCos.checked));
  toggleTan.addEventListener("change", () => onFunctionToggle("tan", toggleTan.checked));

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
    setFunctionVisibility(functionVisibility) {
      toggleSin.checked = functionVisibility.sin;
      toggleCos.checked = functionVisibility.cos;
      toggleTan.checked = functionVisibility.tan;
    },
  };
}
