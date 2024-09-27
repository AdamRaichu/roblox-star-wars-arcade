import { Service } from "@flamework/core";
import { getBadTeam, getGoodTeam } from "../teams";

@Service()
export class BankingService {
  funds: ForBothTeams<number>;

  constructor() {
    this.funds = {
      Republic: 0,
      Separatists: 0,
    };
  }

  public getFor(team: Team) {
    if (team.Name === getGoodTeam().Name) {
      return this.funds.Republic;
    } else if (team.Name === getBadTeam().Name) {
      return this.funds.Separatists;
    } else {
      warn(this.getUnknownTeamWarning(team));
      return 0;
    }
  }

  public add(team: Team, amount: number) {
    if (team.Name === getGoodTeam().Name) {
      this.funds.Republic += amount;
    } else if (team.Name === getBadTeam().Name) {
      this.funds.Separatists += amount;
    } else {
      warn(this.getUnknownTeamWarning(team));
    }
  }

  private getUnknownTeamWarning(team: Team): string {
    return `Tried to access the funds for unknown team "${team.Name}"`;
  }
}
