import { Service } from "@flamework/core";
import { EventListeningService } from "./helper/EventListeningService";

const fw = script.Parent?.Parent?.Parent as LocalFlameworkFolder;
const updateChannel = fw.events.SettingsUpdateChannel;

@Service()
export class PlayerSettingsService extends EventListeningService<S2C_ARGS> {
  constructor() {
    super(updateChannel);
    print("PlayerSettingsService initialized");
  }

  protected messageHandler(player: Player, ...args: defined[]): void {}
}
