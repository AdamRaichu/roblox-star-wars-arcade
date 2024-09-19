import { Flamework } from "@flamework/core";
import { teams } from "@rbxts/adamraichu__local_rbx-swa-common";

const ServerStorage = game.GetService("ServerStorage");

teams.createTeams();

// const rideMttPrompt = logic.prompts.createPromptForRideable(game.Workspace.MTT);

Flamework.addPaths("node_modules/@rbxts/Star Wars Arcade - Shared Library/flamework");
Flamework.ignite();

print("Flamework started");

task.wait(5);

const clone = ServerStorage.MTT.Clone();
// clone.Name = "MTT Number Dos";
clone.Parent = game.Workspace;
