import { mountRideable, playerCanMount } from "./vehicles";

function createPrompt(
	parent: Instance,
	object: string,
	action: string,
	duration: number,
	controllerButton: Enum.KeyCode,
	keyboardButton?: Enum.KeyCode,
): ProximityPrompt {
	const prompt = new Instance("ProximityPrompt");
	prompt.RequiresLineOfSight = false;
	prompt.ActionText = action;
	prompt.ObjectText = object;
	prompt.HoldDuration = duration;
	prompt.GamepadKeyCode = controllerButton;
	prompt.KeyboardKeyCode = keyboardButton ?? Enum.KeyCode.E;

	prompt.Parent = parent;
	return prompt;
}

export function createPromptForRideable(vehicle: RideableModel): ProximityPrompt {
	const rideButton = createPrompt(
		vehicle.VehicleSeat,
		vehicle.Name,
		"Mount/Dismount",
		0.25,
		Enum.KeyCode.ButtonY,
		Enum.KeyCode.R,
	);
	rideButton.MaxActivationDistance = 10;
	rideButton.RequiresLineOfSight = false;

	let lastRider: Model | undefined;

	rideButton.Triggered.Connect((player) => {
		const seat = vehicle.VehicleSeat;
		const hum = seat.Occupant as Humanoid | undefined;

		print(`Player: ${player}; Occupant: ${hum}`);
		if (hum?.Parent?.Name === player.Name) {
			hum.Sit = false;
			task.wait(0.25);
			const rootPart = player.Character?.PrimaryPart as BasePart;
			// rootPart.Position = rootPart.Position.add(rootPart.CFrame.RightVector.mul(-10));
			player?.Character?.MoveTo(vehicle.DismountLocation.Position);
			hum.ResetPropertyToDefault("JumpPower");
			return;
		}
		const [canMount, reason] = playerCanMount(player, vehicle);
		if (canMount) {
			mountRideable(player, vehicle);
			((player.Character as Model).FindFirstChildOfClass("Humanoid") as Humanoid).JumpPower = 0;
		} else {
			warn(`Player ${player.Name} tried to mount vehicle ${vehicle.Name}, but failed: ${reason}`);
		}
	});

	return rideButton;
}
