import { Base } from "./base";

export class Game {
	static readonly SETTINGS_PRESETS: { [name: string]: GameSettings } = {
		// CMDCNTR_VANILLA: {},
	};

	private settings: GameSettings;
	private goodGuys: Team;
	private badGuys: Team;
	private bases: Base[][];

	constructor(settings: GameSettings, teams: [Team, Team], geographicalCenter: Part) {
		this.settings = settings;
		this.goodGuys = teams[0];
		this.badGuys = teams[1];
		this.bases = [];
	}

	getStatus(): GameStatus {
		return {
			bases: this.bases,
		};
	}

	getBasesForTeam(team: Team): Base[] {
		const returnData: Base[] = [];
		this.bases.forEach((bases) => {
			bases.forEach((base) => {
				if (base.getOwner() === team) {
					returnData.push(base);
				}
			});
		});
		return returnData;
	}
}
