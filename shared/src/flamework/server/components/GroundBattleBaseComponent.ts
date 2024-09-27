import { BaseComponent, Component } from "@flamework/components";
import { SHIELD_VISIBLE_TRANSPARENCY } from "../../../constants";
import { Direction } from "../../utils";
import { BuildingTracker } from "../services/BuildingTracker";
import { getNeutralTeam } from "../teams";
import { BuildingComponent } from "./BuildingComponent";

const TeamService = game.GetService("Teams");

interface GroundBattleBaseAttributes {
  mapPosition: Vector2;
}

@Component({ tag: "base-component-tag" })
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export class GroundBattleBaseComponent extends BaseComponent<GroundBattleBaseAttributes, BaseModel> {
  private shieldActive = false;
  private controllingTeam: Team = getNeutralTeam();
  private buildings: BuildingComponent[] = [];

  constructor(private readonly buildingTracker: BuildingTracker) {
    super();

    this.buildingTracker.registerBase(this);
    // TODO: Register on client side as well (for map)
  }

  // METADATA RETRIEVAL

  public getTeam(): Team {
    return this.controllingTeam;
  }

  public isNeutral(): boolean {
    return this.getTeam().Name === getNeutralTeam().Name;
  }

  public getBuildingCount() {
    let count = 0;
    this.buildings.forEach((component) => {
      if (component.isLiving()) {
        count++;
      }
    });
    return count;
  }

  // CONTROL

  public enableShield(): void {
    if (this.shieldActive) {
      return;
    }

    const shield = this.instance.Shield;
    shield.Transparency = SHIELD_VISIBLE_TRANSPARENCY;
    shield.CanCollide = true;
    shield.Color = this.controllingTeam.TeamColor.Color;
  }

  public disableShield(): void {
    if (!this.shieldActive) {
      return;
    }

    const shield = this.instance.Shield;
    shield.Transparency = 1;
    shield.CanCollide = false;
  }

  public build(building: DestructibleBuilding, direction: Direction): void {}
}
