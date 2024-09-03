const TeamService = game.GetService("Teams");

export function createTeams() {
	const republic = new Instance("Team");
	republic.Name = "Republic";
	republic.TeamColor = BrickColor.Blue();

	const separatists = new Instance("Team");
	separatists.Name = "Separatists";
	separatists.TeamColor = BrickColor.Red();

	republic.Parent = TeamService;
	separatists.Parent = TeamService;
}
