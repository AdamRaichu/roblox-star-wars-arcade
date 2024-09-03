export function removeFromQueues(player: Player) {}

export const defaultQueueState = new Instance("Folder");
defaultQueueState.Name = "QueueState";
const geoQueue = new Instance("BoolValue");
geoQueue.Name = "IsInGeoQueue";
geoQueue.Value = false;
geoQueue.Parent = defaultQueueState;
