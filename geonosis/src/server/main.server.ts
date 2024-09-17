import { Flamework } from "@flamework/core";
import { logic, teams } from "@rbxts/adamraichu__local_rbx-swa-common";

teams.createTeams();

// const rideMttPrompt = logic.prompts.createPromptForRideable(game.Workspace.MTT);

Flamework.addPaths("node_modules/@rbxts/Star Wars Arcade - Shared Library/flamework");
Flamework.ignite();

print("Flamework started");
