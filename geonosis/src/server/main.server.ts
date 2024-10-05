import { Components as _Components } from "@flamework/components";
import { Dependency, Flamework } from "@flamework/core";
import { components, logic, sendSystemMessageTo, teams, utils } from "@rbxts/adamraichu__local_rbx-swa-common";

const ServerStorage = game.GetService("ServerStorage");
const Players = game.GetService("Players");

teams.createTeams();

Flamework.addPaths("node_modules/@rbxts/adamraichu__local_rbx-swa-common/out/flamework/server/components");
Flamework.addPaths("node_modules/@rbxts/adamraichu__local_rbx-swa-common/out/flamework/server/services");
Flamework.ignite();

const Components = Dependency<_Components>();

print("Flamework started");

async function buildCommandCenterAt(direction: utils.Direction) {
  const commandCenter = ServerStorage.Buildings["Forward Command Center"].Clone();
  commandCenter.Parent = game.Workspace;
  const component = await Components.waitForComponent<components.BuildingComponent>(commandCenter);
  component.attachToBase(game.Workspace.Bases.Base, direction);
}

// buildCommandCenterAt(utils.Direction.N);
// buildCommandCenterAt(utils.Direction.NE);
buildCommandCenterAt(utils.Direction.E);
// buildCommandCenterAt(utils.Direction.SE);
// buildCommandCenterAt(utils.Direction.S);
// buildCommandCenterAt(utils.Direction.SW);
// buildCommandCenterAt(utils.Direction.W);
// buildCommandCenterAt(utils.Direction.NW);

Players.PlayerAdded.Connect((player) => {
  player.CharacterAdded.Connect((character) => {
    new Promise((resolve, reject) => {
      print("Character added");

      if (!character.PrimaryPart) {
        return;
      }

      // eslint-disable-next-line no-constant-condition
      while (true) {
        wait(1);
        const look = character.PrimaryPart.CFrame.LookVector;
        logic.fireBullet(character.PrimaryPart, look, 50, teams.getGoodTeam());
      }
    });
  });
});

task.wait(5);
sendSystemMessageTo("Hello, world!", "ALL");

// ServerStorage.Vehicles.MTT.Clone().Parent = game.Workspace;
