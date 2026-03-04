import { createUnitCircleScene } from "./scene/unitCircleScene.js";
import { createAppState } from "./state/appState.js";
import { createControlPanel } from "./ui/controlPanel.js";
import { createValuePanel } from "./ui/valuePanel.js";
import { createTrigPlot } from "./charts/trigPlot.js";
import {
  calculateTrigValues,
  degreesToRadians,
  radiansToDegrees,
} from "./math/trigModel.js";

const sceneRoot = document.getElementById("scene-root");

if (!sceneRoot) {
  throw new Error("App root elements are missing.");
}

const appState = createAppState(0);
const unitCircleScene = createUnitCircleScene(sceneRoot, appState.angle);
const valuePanel = createValuePanel();
const trigPlot = createTrigPlot();
const functionVisibility = { sin: true, cos: true, tan: true };
const controlPanel = createControlPanel({
  onTogglePlay: togglePlay,
  onStep: stepAngle,
  onSpeedChange: setSpeed,
  onAngleChangeDegrees: (angleDegrees) => setAngle(degreesToRadians(angleDegrees)),
  onFunctionToggle: setFunctionVisibility,
});

let isPlaying = false;
let speedMultiplier = 1;
const baseAngularVelocity = Math.PI / 2;

const unsubscribe = appState.subscribe((angle) => {
  unitCircleScene.updateAngle(angle);
  const values = calculateTrigValues(angle);
  valuePanel.update(values);
  controlPanel.setAngleDegrees(radiansToDegrees(angle));
  trigPlot.setAngle(angle);
});

const FIXED_FPS = 60;
const FRAME_TIME_MS = 1000 / FIXED_FPS;
let lastTimestamp = performance.now();
let frameAccumulator = 0;

function animationLoop(timestamp) {
  frameAccumulator += timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  while (frameAccumulator >= FRAME_TIME_MS) {
    if (isPlaying) {
      setAngle(appState.angle + baseAngularVelocity * speedMultiplier * (FRAME_TIME_MS / 1000));
    }
    unitCircleScene.render();
    frameAccumulator -= FRAME_TIME_MS;
  }

  requestAnimationFrame(animationLoop);
}

function setAngle(angleRadians) {
  return appState.setAngle(angleRadians);
}

function togglePlay() {
  isPlaying = !isPlaying;
  controlPanel.setPlaying(isPlaying);
}

function stepAngle() {
  setAngle(appState.angle + degreesToRadians(15));
}

function setSpeed(nextSpeed) {
  speedMultiplier = nextSpeed;
}

function setFunctionVisibility(name, isVisible) {
  functionVisibility[name] = isVisible;
  valuePanel.setFunctionVisibility(functionVisibility);
  trigPlot.setVisibility(functionVisibility);
}

window.addEventListener("resize", () => unitCircleScene.resize());
window.addEventListener("beforeunload", () => {
  unsubscribe();
  unitCircleScene.dispose();
});

unitCircleScene.resize();
controlPanel.setPlaying(isPlaying);
controlPanel.setSpeed(speedMultiplier);
controlPanel.setFunctionVisibility(functionVisibility);
valuePanel.setFunctionVisibility(functionVisibility);
trigPlot.setVisibility(functionVisibility);
requestAnimationFrame(animationLoop);

window.trigExplorer = {
  setAngle,
};
