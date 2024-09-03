const TeamService = game.GetService("Teams");

export function createTeams(): [Team, Team] {
	const good = new Instance("Team");
	good.Name = "Republic";
	good.TeamColor = BrickColor.Blue();

	const bad = new Instance("Team");
	bad.Name = "Separatists";
	bad.TeamColor = BrickColor.Red();

	good.Parent = TeamService;
	bad.Parent = TeamService;

	return [good, bad];
}
