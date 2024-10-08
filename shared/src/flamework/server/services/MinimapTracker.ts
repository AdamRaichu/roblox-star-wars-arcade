import { Service } from "@flamework/core";
import { MINIMAP_C2S_COMMANDS, MINIMAP_ICON_IDS } from "../../constants";
import { WithHealthComponent } from "../components";
import { EventListeningService } from "./helper/EventListeningService";

const fw = script.Parent?.Parent?.Parent as LocalFlameworkFolder;
const dataChannel = fw.events.MinimapDataChannel;

@Service()
export class MinimapTracker extends EventListeningService {
  private trackedComponents: WithHealthComponent<MinimapTrackedModel>[] = [];
  private icons: MINIMAP_ICON_IDS[] = [];
  private colors: Color3[] = [];

  constructor() {
    super(dataChannel);
    print("MinimapTracker initialized");
  }

  public registerComponent(
    component: WithHealthComponent<MinimapTrackedModel>,
    iconId: MINIMAP_ICON_IDS,
    color: Color3,
  ) {
    this.trackedComponents.push(component);
    this.icons.push(iconId);
    this.colors.push(color);
  }

  protected messageHandler(player: Player, ...args: unknown[]): void {
    if (!args) {
      this.w("Received event with no data.");
      return;
    }
    const _command = (args as defined[]).shift();

    if (typeOf(_command) !== "string") {
      this.w("_command was not a string.");
      return;
    }

    const command = _command as MINIMAP_C2S_COMMANDS;
    switch (command) {
      case MINIMAP_C2S_COMMANDS.Refresh:
        print("Received refresh command");
        dataChannel.FireClient(player, this.getMapData());
        break;

      default:
        return;
    }
  }

  private getMapData() {
    const returnData: MinimapItem[] = [];

    this.trackedComponents.forEach((comp, index) => {
      const wPos = comp.instance.Hitbox.MinimapPositionBeacon.WorldPosition;
      returnData.push({
        color: this.colors[index],
        iconId: this.icons[index],
        position: new Vector2(wPos.X, wPos.Z),
      });
    });

    return returnData;
  }

  private w(...args: unknown[]) {
    warn(`[MinimapTracker] `, ...args);
  }
}
