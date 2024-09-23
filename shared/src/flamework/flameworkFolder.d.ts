interface LocalFlameworkFolder extends Instance {
  events: Folder & {
    PlayerFireEvent: RemoteEvent;
    SystemChatEvent: RemoteEvent;
  };
}

interface TextChatService extends Instance {
  TextChannels: TextChannelsFolder;
}

interface TextChannelsFolder extends Folder {
  RBXGeneral: TextChannel;
  RBXSystem: TextChannel;
}
