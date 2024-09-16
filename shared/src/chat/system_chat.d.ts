interface ChatScript_WithRemoteEvent extends Script {
	SystemChatEvent: RemoteEvent;
}

interface TextChatService extends Instance {
	TextChannels: TextChannelsFolder;
}

interface TextChannelsFolder extends Folder {
	RBXGeneral: TextChannel;
	RBXSystem: TextChannel;
}
