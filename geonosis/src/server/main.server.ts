import { Components as _Components } from "@flamework/components";
import { Dependency, Flamework } from "@flamework/core";
import { chat, components, fireBullet, teams } from "@rbxts/adamraichu__local_rbx-swa-common/out/flamework/server";
import { Direction } from "@rbxts/adamraichu__local_rbx-swa-common/out/flamework/utils";

const ServerStorage = game.GetService("ServerStorage");
const Players = game.GetService("Players");
const RunService = game.GetService("RunService");

teams.createTeams();

Flamework.addPaths("node_modules/@rbxts/adamraichu__local_rbx-swa-common/out/flamework/server/components");
Flamework.addPaths("node_modules/@rbxts/adamraichu__local_rbx-swa-common/out/flamework/server/services");
Flamework.ignite();

const Components = Dependency<_Components>();

print("Flamework started");

async function buildCommandCenterAt(direction: Direction) {
  const commandCenter = ServerStorage.Buildings["Forward Command Center"].Clone();
  commandCenter.Parent = game.Workspace;
  const component = await Components.waitForComponent<components.BuildingComponent>(commandCenter);
  component.attachToBase(game.Workspace.Bases.Base, direction);
}

// buildCommandCenterAt(utils.Direction.N);
// buildCommandCenterAt(utils.Direction.NE);
buildCommandCenterAt(Direction.E);
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
        fireBullet(character.PrimaryPart, look, 50, teams.getGoodTeam());
      }
    });
  });
});

task.wait(5);
chat.sendSystemMessageTo("Hello, world!", "ALL");

// ServerStorage.Vehicles.MTT.Clone().Parent = game.Workspace;
