const fw = script.Parent?.Parent as LocalFlameworkFolder;

export function sendSystemMessageTo(message: string, player: Player | "ALL") {
  if (player === "ALL") {
    fw.events.SystemChatEvent.FireAllClients(message);
    return;
  }

  fw.events.SystemChatEvent.FireClient(player as Player, message);
}
