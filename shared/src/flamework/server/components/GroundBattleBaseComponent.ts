import { BaseComponent, Component } from "@flamework/components";
import { getNeutralTeam } from "../teams";
import { Direction } from "../../utils";
import { SHIELD_VISIBLE_TRANSPARENCY } from "../../../constants";

const TeamService = game.GetService("Teams");

@Component({ tag: "base-component-tag" })
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export class GroundBattleBaseComponent extends BaseComponent<{}, BaseModel> {
  private shieldActive = false;
  private centerIsRayShielded = false;
  private controllingTeam: Team = getNeutralTeam();

  public getTeam(): Team {
    return this.controllingTeam;
  }

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
