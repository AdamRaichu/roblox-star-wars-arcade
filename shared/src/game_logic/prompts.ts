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

export function createPromptForRideable(seat: VehicleSeat): ProximityPrompt {
	const rideButton = createPrompt(
		seat,
		seat?.Parent?.Name ?? "Unknown Rideable",
		"Ride",
		1,
		Enum.KeyCode.ButtonY,
		Enum.KeyCode.R,
	);
	rideButton.MaxActivationDistance = 10;
	return rideButton;
}
