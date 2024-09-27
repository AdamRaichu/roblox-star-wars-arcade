import { Service } from "@flamework/core";
import { GroundBattleBaseComponent } from "../components";
import { getBadTeam, getGoodTeam } from "../teams";
import { Direction } from "../../utils";

@Service()
export class BuildingTracker {
  private bases: GroundBattleBaseComponent[][] = [];
  private availableBuildings: ForBothTeams<BuildMenuCategory[]> = {
    Republic: [],
    Separatists: [],
  };

  constructor() {}

  // SETUP

  public registerBase(base: GroundBattleBaseComponent) {
    const pos = base.attributes.mapPosition;
    this.bases[pos.X][pos.Y] = base;
  }

  public registerAvailableBuildings(
    config: ForBothTeams<BuildMenuCategory[]>,
    flags?: { suppressDifferingCategoryCountWarning: boolean },
  ) {
    if (
      config.Separatists.size() !== config.Republic.size() &&
      !(flags?.suppressDifferingCategoryCountWarning ?? false)
    ) {
      warn(`Different number of categories. (This warning can be suppressed via the second function parameter.)`);
    }

    this.availableBuildings = config;
  }

  // METADATA RETRIEVAL

  /**
   * Used to get the theoretical buildings that a player could build. Checks for base count and number of buildings at base. Does NOT check for available studs. Use `canBuild` instead for that.
   */
  public getBuildOptionsFor(team: Team, at: GroundBattleBaseComponent): BuildMenuCategory[] {
    if (team.Name !== at.getTeam().Name && !at.isNeutral()) {
      return [];
    }

    if (at.getBuildingCount() >= 3) {
      return [];
    }

    let baseCount = this.getBaseCountForTeam(team);
    baseCount += at.isNeutral() ? 1 : 0;

    let masterList: BuildMenuCategory[] = [];

    if (team.Name === getGoodTeam().Name) {
      masterList = this.availableBuildings.Republic;
    } else if (team.Name === getBadTeam().Name) {
      masterList = this.availableBuildings.Separatists;
    }

    return masterList.filter((_value, index) => {
      return index <= baseCount;
    });
  }

  public canBuild(team: Team, base: GroundBattleBaseComponent, pos: Direction, building: BuildMenuOptionData): boolean {
    return false; // FIXME:
  }

  public getBaseCountForTeam(team: Team) {
    let count = 0;
    this.bases.forEach((columns) => {
      columns.forEach((base) => {
        if (base.getTeam().Name === team.Name) {
          count++;
        }
      });
    });
    return count;
  }
}
