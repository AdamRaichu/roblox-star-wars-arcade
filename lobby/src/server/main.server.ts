import { defaultQueueState } from "./queue_service";

const Players = game.GetService("Players");

Players.PlayerAdded.Connect((player) => {
  defaultQueueState.Clone().Parent = player;
});
