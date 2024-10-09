import { Service } from "@flamework/core";
import { MINIMAP_C2S_COMMANDS, MINIMAP_ICON_IDS, MINIMAP_S2C_COMMANDS } from "../../constants";
import { WithHealthComponent } from "../components";
import { EventListeningService } from "./helper/EventListeningService";

const fw = script.Parent?.Parent?.Parent as LocalFlameworkFolder;
const dataChannel = fw.events.MinimapDataChannel;

@Service()
export class MinimapTracker extends EventListeningService<MinimapS2CCommands> {
  private trackedComponents: WithHealthComponent<MinimapTrackedModel>[] = [];
  private icons: MINIMAP_ICON_IDS[] = [];
  private colors: Color3[] = [];
  private areAllCornersRegistered = false;
  private corners: PartWithAttachment[] = [];

  constructor() {
    super(dataChannel);
    print("MinimapTracker initialized");
  }

  public registerCorner(corner: PartWithAttachment) {
    this.corners.push(corner);
    if (this.areAllCornersRegistered) {
      this.w(this.corners);
      error("All minimap corners have already been registered.");
    }

    if (this.corners.size() === 4) {
      this.areAllCornersRegistered = true;
    }
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

  protected messageHandler(player: Player, args: defined[]): void {
    const command = args.shift();

    if (typeOf(command) !== "string") {
      this.w("_command was not a string.");
      this.w(command);
      return;
    }

    switch (command as string) {
      case MINIMAP_C2S_COMMANDS.RefreshRequest:
        print("Received refresh request");
        this.sendMessageToClient(player, MINIMAP_S2C_COMMANDS.RefreshFulfill, this.getMapData());
        break;

      default:
        this.w(`Unknown command "${command}"`);
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
        positionX: wPos.X,
        positionY: wPos.Z,
      });
    });

    return returnData;
  }

  private w(...args: unknown[]) {
    warn(`[MinimapTracker] `, ...args);
  }
}
