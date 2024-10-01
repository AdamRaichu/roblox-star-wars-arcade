import { Component } from "@flamework/components";
import { createPrompt } from "../../utils";
import { WithHealthComponent } from "./WithHealthComponent";

const Players = game.GetService("Players");

@Component({ tag: "vehicle-component-tag" })
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export abstract class VehicleComponent extends WithHealthComponent<HealthAttributes, RideableModel> {
  protected abstract fireDelay: number;
  protected canFire = true;

  constructor() {
    super();
    print(`Found vehicle ${this.instance.GetFullName()}`);
    this.addPrompt();
    this.addFireEvent();
  }

  private addFireEvent() {
    const event = new Instance("RemoteEvent");
    event.Name = "FireEvent";
    event.Parent = this.instance;

    event.OnServerEvent.Connect((plr: Player) => {
      if (!this.hasRider()) {
        return;
      }
      if (this.getRider()?.Name !== plr.Name) {
        return;
      }
      if (!this.canFire) {
        return;
      }
      this.fire();
      this.canFire = false;
      new Promise((resolve) => {
        task.wait(this.fireDelay);
        this.canFire = true;
        resolve(undefined);
      });
    });
  }

  private addPrompt(): void {
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
    rideButton.Name = "MountDismountPrompt";

    rideButton.Triggered.Connect((plr) => this.playerTriggeredPrompt(plr));
  }

  public playerCanMount(player: Player): [true] | [false, string] {
    const config = this.instance.VehicleConfig;

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

  public mountRider(player: Player): void {
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

  protected playerTriggeredPrompt(player: Player) {
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
  }

  public hasRider(): boolean {
    return this.instance.VehicleSeat.Occupant !== undefined;
  }

  public getRider(): Player | undefined {
    const seat = this.instance.VehicleSeat;
    if (seat.Occupant) {
      const player = Players.GetPlayerFromCharacter(seat.Occupant.Parent);
      if (player) {
        return player;
      }
    }
    return undefined;
  }

  protected deathAnimation(): void {
    const seat = this.instance.VehicleSeat;
    if (seat.Occupant) {
      const player = Players.GetPlayerFromCharacter(seat.Occupant.Parent);
      if (player) {
        this.playerTriggeredPrompt(player);
      }
    }

    (seat.FindFirstChildOfClass("ProximityPrompt") as ProximityPrompt).Enabled = false;

    task.wait(1.5);

    // TODO: Add explosion.

    this.instance.Destroy();
  }

  protected abstract fire(): Promise<void>;
}
