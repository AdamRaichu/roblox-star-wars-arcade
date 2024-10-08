interface LocalFlameworkFolder extends Instance {
  events: Folder & {
    MinimapDataChannel: RemoteEvent;
    PlayerFireEvent: RemoteEvent;
    SettingsUpdateChannel: RemoteEvent;
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
