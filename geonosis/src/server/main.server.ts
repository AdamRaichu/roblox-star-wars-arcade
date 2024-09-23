import { Components as _Components } from "@flamework/components";
import { Dependency, Flamework } from "@flamework/core";
import { components, sendSystemMessageTo, teams, utils } from "@rbxts/adamraichu__local_rbx-swa-common";

const ServerStorage = game.GetService("ServerStorage");
const Players = game.GetService("Players");

teams.createTeams();

Flamework.addPaths("node_modules/@rbxts/adamraichu__local_rbx-swa-common/out/flamework/server/components");
Flamework.ignite();

print(components);

const Components = Dependency<_Components>();

print("Flamework started");

const commandCenter = ServerStorage.Buildings["Forward Command Center"].Clone();
commandCenter.Parent = game.Workspace;
Components.waitForComponent<components.BuildingComponent>(commandCenter).then((component) => {
  component.attachToBase(game.Workspace.Bases.Base, utils.Direction.E);
});

/*
Players.PlayerAdded.Connect((player) => {
  player.CharacterAdded.Connect((character) => {
    new Promise((resolve, reject) => {
      print("Character added");
      while (!character.PrimaryPart) {
        print("Waiting for character to be ready");
        wait(1);
      }

      // eslint-disable-next-line no-constant-condition
      while (true) {
        wait(1);
        const look = character.PrimaryPart?.CFrame.LookVector;
        // FIXME: logic.fireBullet is completely broken right now, and I don't know why. Troubleshoot later.
        logic.fireBullet(character.PrimaryPart.Position, look.mul(10), 1, teams.getGoodTeam());
      }
    });
  });
});
 */
