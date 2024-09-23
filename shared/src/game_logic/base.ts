import { Direction } from "../flamework/utils";

export class Base {
  private _owner?: Team;
  private buildings: DestructibleBuilding[];
  private model: BaseModel;

  constructor(model: Model, owner?: Team) {
    this._owner = owner;
    this.buildings = [];
    this.model = model as BaseModel;
  }

  getOwner(): Team | undefined {
    return this._owner;
  }

  getBuildingAt(dir: Direction): DestructibleBuilding | undefined {
    return this.buildings[dir];
  }

  setBuildingAt(dir: Direction, building: DestructibleBuilding): void {
    this.buildings[dir] = building;
  }

  getBuildingCount(): number {
    let count = 0;

    for (const building of this.buildings) {
      if (building !== undefined) {
        count++;
      }
    }

    return count;
  }
}
