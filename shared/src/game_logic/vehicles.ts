export function playerCanMount(player: Player, vehicle: RideableModel): [true] | [false, string] {
	const config = vehicle.CONFIG;

	if (hasRider(vehicle)) {
		// TODO: When adding NPC control, make sure this logic still works.
		return [false, "Vehicle is already occupied!"];
	}

	if (config.ControllingTeam.Value !== (player.Team?.Name ?? "__NO_TEAM__") && !config.CanBeHijacked.Value) {
		return [false, "Vehicle belongs to the other team, and cannot currently be hijacked!"];
	}

	return [true];
}

export function mountRideable(player: Player, vehicle: RideableModel): void {
	const ch = player?.Character ?? new Instance("Model");
	const hum = ch.FindFirstChildOfClass("Humanoid");

	if (hum === undefined) {
		warn(
			`Tried to mount player ${player.Name} to vehicle ${vehicle.Name}, but player Character or Humanoid is undefined.`,
		);
		warn(player);
		warn(vehicle);
		return;
	}

	vehicle.VehicleSeat.Sit(hum);
}

export function hasRider(vehicle: RideableModel): boolean {
	return vehicle.VehicleSeat.Occupant !== undefined;
}
