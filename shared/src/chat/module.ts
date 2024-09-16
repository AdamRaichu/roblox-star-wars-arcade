const RunService = game.GetService("RunService");
const TextChatService = game.GetService("TextChatService");

const event = (script?.Parent as ChatScript_WithRemoteEvent).SystemChatEvent as RemoteEvent;

export function sendSystemMessage(message: string, player: Player | "ALL") {
	if (player === "ALL") {
		event.FireAllClients(message);
	}

	event.FireClient(player as Player, message);
}

export function initClient() {
	if (!RunService.IsClient()) {
		error("Called system chat `initClient` from the server.", 2);
	}

	const channelsExist = false;

	function waitForChannels() {
		TextChatService.WaitForChild("TextChannels");
		TextChatService.TextChannels.WaitForChild("RBXSystem");
	}

	event.OnClientEvent.Connect((message: string) => {
		if (!channelsExist) {
			waitForChannels();
		}

		TextChatService.TextChannels.RBXSystem.DisplaySystemMessage(message);
	});
}
