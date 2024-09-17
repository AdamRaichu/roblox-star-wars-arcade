export function raycastBetweenPoints(
	from: Vector3,
	to: Vector3,
	params: RaycastParams,
): Promise<RaycastResult | undefined> {
	return new Promise((resolve, reject) => {
		resolve(game.Workspace.Raycast(from, to.sub(from), params));
	});
}

export function getPointFromDistance(lookVector: Vector3, distance: number): Vector3 {
	return lookVector.mul(distance);
}
