const RunService = game.GetService("RunService");

if (RunService.IsClient()) {
  error("Tried to load flamework/server on the client.", 2);
}

export * as components from "./components";
export * as services from "./services";
export * as teams from "./teams";
export * as chat from "./system_chat";
export { fireBullet } from "./blaster";
