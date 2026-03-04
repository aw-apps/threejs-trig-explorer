const TWO_PI = Math.PI * 2;

function normalizeAngle(angleRadians) {
  const normalized = angleRadians % TWO_PI;
  return normalized >= 0 ? normalized : normalized + TWO_PI;
}

export function createAppState(initialAngle = 0) {
  let angle = normalizeAngle(initialAngle);
  const listeners = new Set();

  function notify() {
    for (const listener of listeners) {
      listener(angle);
    }
  }

  return {
    get angle() {
      return angle;
    },
    setAngle(nextAngle) {
      angle = normalizeAngle(nextAngle);
      notify();
      return angle;
    },
    subscribe(listener) {
      listeners.add(listener);
      listener(angle);
      return () => listeners.delete(listener);
    },
  };
}
