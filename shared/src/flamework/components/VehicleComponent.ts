import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { createPrompt } from "../utils";

@Component({ tag: "vehicle-component-tag" })
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export class VehicleComponent extends BaseComponent<{}, RideableModel> implements OnStart {
	private lastRider?: Model = undefined;

	constructor() {
		super();
	}

	onStart(): void {
		print(`Found vehicle ${this.instance.GetFullName()}`);
		this.addPrompt();
	}

	addPrompt(): void {
		const rideButton = createPrompt(
			this.instance.VehicleSeat,
			this.instance.Name,
			"Mount/Dismount",
			0.25,
			Enum.KeyCode.ButtonY,
			Enum.KeyCode.R,
		);
		rideButton.MaxActivationDistance = 10;
		rideButton.RequiresLineOfSight = false;

		print(`Adding listener to ${this.instance.GetFullName()}`);
		print(this.instance.VehicleSeat.GetChildren());

		rideButton.Triggered.Connect((player) => {
			print(`Listener triggered for ${this.instance.GetFullName()}`);
			const seat = this.instance.VehicleSeat;
			const hum = seat.Occupant as Humanoid | undefined;

			print(`Player: ${player}; Occupant: ${hum}`);
			// leave vehicle
			if (hum?.Parent?.Name === player.Name) {
				hum.Sit = false;
				task.wait(0.25);
				const rootPart = player.Character?.PrimaryPart as BasePart;
				player?.Character?.MoveTo(this.instance.DismountLocation.Position);
				hum.ResetPropertyToDefault("JumpPower");
				return;
			}

			// mount vehicle
			const [canMount, reason] = this.playerCanMount(player);
			if (canMount) {
				this.mountRider(player);

				const hum = (player.Character as Model).FindFirstChildOfClass("Humanoid") as Humanoid;
				hum.JumpPower = 0;
			} else {
				warn(`Player ${player.Name} tried to mount vehicle ${this.instance.Name}, but failed: ${reason}`);
			}
		});
	}

	playerCanMount(player: Player): [true] | [false, string] {
		const config = this.instance.CONFIG;

		if (this.hasRider()) {
			// TODO: When adding NPC control, make sure this logic still works.
			return [false, "Vehicle is already occupied!"];
		}

		// eslint-disable-next-line roblox-ts/lua-truthiness
		if (config.ControllingTeam.Value !== (player.Team?.Name ?? "__NO_TEAM__") && !config.CanBeHijacked.Value) {
			return [false, "Vehicle belongs to the other team, and cannot currently be hijacked!"];
		}

		return [true];
	}

	mountRider(player: Player): void {
		const ch = player?.Character ?? new Instance("Model");
		const hum = ch.FindFirstChildOfClass("Humanoid");

		if (hum === undefined) {
			warn(
				`Tried to mount player ${player.Name} to vehicle ${this.instance.Name}, but player Character or Humanoid is undefined.`,
			);
			warn(player);
			warn(this.instance);
			return;
		}

		this.instance.VehicleSeat.Sit(hum);
	}

	hasRider(): boolean {
		return this.instance.VehicleSeat.Occupant !== undefined;
	}
}
