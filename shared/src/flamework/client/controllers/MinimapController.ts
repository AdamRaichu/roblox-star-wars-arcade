import { Controller } from "@flamework/core";
import { GroundBattleBaseComponent } from "../../server/components";

@Controller()
export class MinimapController {
  private bases: GroundBattleBaseComponent[][] = [];

  public registerBase(base: GroundBattleBaseComponent) {
    const pos = base.attributes.mapPosition;
    this.bases[pos.X][pos.Y] = base;
  }
}
