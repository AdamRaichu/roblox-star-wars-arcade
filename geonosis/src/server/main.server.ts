import { logic, teams } from "@rbxts/adamraichu__local_rbx-swa-common";

teams.createTeams();

const rideMttPrompt = logic.prompts.createPromptForRideable(game.Workspace.MTT.VehicleSeat);
rideMttPrompt.Triggered.Connect((player) => {
	const [canMount, reason] = logic.vehicles.playerCanMount(player, game.Workspace.MTT);
	// eslint-disable-next-line roblox-ts/lua-truthiness
	if (canMount) {
		logic.vehicles.mountRideable(player, game.Workspace.MTT);
	}
});
