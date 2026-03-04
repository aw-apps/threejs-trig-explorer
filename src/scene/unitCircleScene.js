import * as THREE from "https://unpkg.com/three@0.161.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.161.0/examples/jsm/controls/OrbitControls.js";

export function createUnitCircleScene(container, initialAngle = 0) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0f172a);

  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 2.5, 4);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(0, 0, 0);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(2, 4, 3);
  scene.add(ambientLight, directionalLight);

  const axes = new THREE.AxesHelper(1.5);
  scene.add(axes);

  const circlePoints = [];
  for (let i = 0; i <= 128; i += 1) {
    const theta = (i / 128) * Math.PI * 2;
    circlePoints.push(new THREE.Vector3(Math.cos(theta), 0, Math.sin(theta)));
  }
  const circleGeometry = new THREE.BufferGeometry().setFromPoints(circlePoints);
  const circleLine = new THREE.LineLoop(
    circleGeometry,
    new THREE.LineBasicMaterial({ color: 0x38bdf8 })
  );
  scene.add(circleLine);

  const rayMaterial = new THREE.LineBasicMaterial({ color: 0xf97316 });
  const rayGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 0, 0),
  ]);
  const angleRay = new THREE.Line(rayGeometry, rayMaterial);
  scene.add(angleRay);

  function updateAngle(angleRadians) {
    const end = new THREE.Vector3(Math.cos(angleRadians), 0, Math.sin(angleRadians));
    angleRay.geometry.setFromPoints([new THREE.Vector3(0, 0, 0), end]);
  }

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width === 0 || height === 0) {
      return;
    }
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function render() {
    controls.update();
    renderer.render(scene, camera);
  }

  function dispose() {
    controls.dispose();
    circleGeometry.dispose();
    rayGeometry.dispose();
    renderer.dispose();
    if (renderer.domElement.parentNode === container) {
      container.removeChild(renderer.domElement);
    }
  }

  updateAngle(initialAngle);

  return {
    updateAngle,
    resize,
    render,
    dispose,
  };
}
