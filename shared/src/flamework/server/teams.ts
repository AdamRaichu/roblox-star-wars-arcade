const TeamService = game.GetService("Teams");

let hasCreatedTeams = false;
let teams: [Team, Team, Team] | undefined = undefined;

export function createTeams(): [Team, Team, Team] {
  if (hasCreatedTeams) {
    return teams!;
  }

  const good = new Instance("Team");
  good.Name = "Republic";
  good.TeamColor = BrickColor.Blue();
  good.AutoAssignable = false;

  const bad = new Instance("Team");
  bad.Name = "Separatists";
  bad.TeamColor = BrickColor.Red();
  bad.AutoAssignable = false;

  const spec = new Instance("Team");
  spec.Name = "Spectator";
  spec.TeamColor = BrickColor.Gray();
  spec.AutoAssignable = true;

  good.Parent = TeamService;
  bad.Parent = TeamService;
  spec.Parent = TeamService;

  hasCreatedTeams = true;
  teams = [good, bad, spec];
  return teams;
}

export function getGoodTeam(): Team {
  if (!hasCreatedTeams) {
    createTeams();
  }
  return teams![0];
}

export function getBadTeam(): Team {
  if (!hasCreatedTeams) {
    createTeams();
  }
  return teams![1];
}

export function getNeutralTeam(): Team {
  if (!hasCreatedTeams) {
    createTeams();
  }
  return teams![2];
}
