import { Component } from "@flamework/components";
import { WithHealthComponent } from "./WithHealthComponent";
import { Direction } from "../../utils";

@Component({ tag: "building-component-tag" })
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export class BuildingComponent extends WithHealthComponent<{}, DestructibleBuilding> {
  deathAnimation(): void {
    error("Unimplemented method deathAnimation");
  }

  public attachToBase(base: BaseModel, pos: Direction) {
    const model = this.instance;
    const weld = new Instance("RigidConstraint");
    weld.Attachment1 = model.AnchorToBase.Attachment;
    switch (pos) {
      case Direction.E:
        weld.Attachment0 = base.BuildingLocations.East.Attachment;
        break;

      default:
        error(`Unexpected direction ${tostring(pos)}`);
    }

    weld.Parent = model;
  }
}
