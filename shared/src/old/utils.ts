export function raycastBetweenPoints(
  from: Vector3,
  to: Vector3,
  params: RaycastParams,
): Promise<RaycastResult | undefined> {
  return new Promise((resolve, reject) => {
    resolve(game.Workspace.Raycast(from, to.sub(from), params));
  });
}

/**
 * Given an angle and a distance, return the point on the line that is that distance away from the origin.
 */
export function getPointFromDistance(origin: Vector3, lookVector: Vector3, distance: number): Vector3 {
  const direction = lookVector.mul(distance);
  return origin.add(direction);
}
