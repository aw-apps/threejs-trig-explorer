const TWO_PI = Math.PI * 2;
const EPSILON = 1e-10;

export function normalizeAngleRadians(angleRadians) {
  const normalized = angleRadians % TWO_PI;
  return normalized >= 0 ? normalized : normalized + TWO_PI;
}

export function degreesToRadians(angleDegrees) {
  return (angleDegrees * Math.PI) / 180;
}

export function radiansToDegrees(angleRadians) {
  return (angleRadians * 180) / Math.PI;
}

export function calculateTrigValues(angle, unit = "radians") {
  const angleRadians = unit === "degrees" ? degreesToRadians(angle) : angle;
  const normalizedAngleRadians = normalizeAngleRadians(angleRadians);
  const sin = Math.sin(normalizedAngleRadians);
  const cos = Math.cos(normalizedAngleRadians);
  const tan = Math.abs(cos) < EPSILON ? null : sin / cos;

  return {
    angleRadians,
    normalizedAngleRadians,
    angleDegrees: radiansToDegrees(angleRadians),
    sin,
    cos,
    tan,
  };
}
