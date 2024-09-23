const fw = script.Parent?.Parent as LocalFlameworkFolder;

print(fw);

export function sendSystemMessageTo(message: string, player: Player | "ALL") {
  if (player === "ALL") {
    fw.events.SystemChatEvent.FireAllClients(message);
  }

  fw.events.SystemChatEvent.FireClient(player as Player, message);
}
