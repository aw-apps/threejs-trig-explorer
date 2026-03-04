import { createUnitCircleScene } from "./scene/unitCircleScene.js";
import { createAppState } from "./state/appState.js";

const sceneRoot = document.getElementById("scene-root");
const angleReadout = document.getElementById("angle-readout");

if (!sceneRoot || !angleReadout) {
  throw new Error("App root elements are missing.");
}

const appState = createAppState(0);
const unitCircleScene = createUnitCircleScene(sceneRoot, appState.angle);

const unsubscribe = appState.subscribe((angle) => {
  unitCircleScene.updateAngle(angle);
  angleReadout.textContent = `Angle: ${angle.toFixed(2)} rad`;
});

const FIXED_FPS = 60;
const FRAME_TIME_MS = 1000 / FIXED_FPS;
let lastTimestamp = performance.now();
let frameAccumulator = 0;

function animationLoop(timestamp) {
  frameAccumulator += timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  while (frameAccumulator >= FRAME_TIME_MS) {
    unitCircleScene.render();
    frameAccumulator -= FRAME_TIME_MS;
  }

  requestAnimationFrame(animationLoop);
}

function setAngle(angleRadians) {
  return appState.setAngle(angleRadians);
}

window.addEventListener("resize", () => unitCircleScene.resize());
window.addEventListener("beforeunload", () => {
  unsubscribe();
  unitCircleScene.dispose();
});

unitCircleScene.resize();
requestAnimationFrame(animationLoop);

// Sample angle change for validation.
setTimeout(() => setAngle(Math.PI / 4), 1000);

window.trigExplorer = {
  setAngle,
};
