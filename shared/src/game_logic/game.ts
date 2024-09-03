export class Game {
	private goodGuys: Team;
	private badGuys: Team;

	constructor(teams: [Team, Team], geographicalCenter: Part) {
		this.goodGuys = teams[0];
		this.badGuys = teams[1];
	}
}
