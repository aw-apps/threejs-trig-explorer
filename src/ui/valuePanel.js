export function createValuePanel() {
  const angleRadians = document.getElementById("angle-radians");
  const angleDegrees = document.getElementById("angle-degrees");
  const sinReadout = document.getElementById("sin-readout");
  const cosReadout = document.getElementById("cos-readout");
  const tanReadout = document.getElementById("tan-readout");

  if (!angleRadians || !angleDegrees || !sinReadout || !cosReadout || !tanReadout) {
    throw new Error("Value panel elements are missing.");
  }

  return {
    update(values) {
      angleRadians.textContent = `Angle: ${values.normalizedAngleRadians.toFixed(2)} rad`;
      angleDegrees.textContent = `Angle: ${values.angleDegrees.toFixed(2)}°`;
      sinReadout.textContent = `sin(θ): ${values.sin.toFixed(4)}`;
      cosReadout.textContent = `cos(θ): ${values.cos.toFixed(4)}`;
      tanReadout.textContent =
        values.tan === null ? "tan(θ): undefined" : `tan(θ): ${values.tan.toFixed(4)}`;
    },
  };
}
