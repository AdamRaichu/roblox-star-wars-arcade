import { Controller } from "@flamework/core";
import { MINIMAP_C2S_COMMANDS, MINIMAP_CONTROLLER_COMMANDS, MINIMAP_S2C_COMMANDS } from "../../constants";
import { EventListeningController } from "./helper/EventListeningController";

const fw = script.Parent?.Parent?.Parent as LocalFlameworkFolder;

const Players = game.GetService("Players");

@Controller()
export class MinimapRenderer extends EventListeningController<MinimapS2CCommands> {
  private renderScale = 1;

  constructor() {
    super(fw.events.MinimapDataChannel);
    print("MinimapRenderer initialized");

    const gui = this.getBaseGui();
    // gui.Parent = Players.LocalPlayer.WaitForChild("PlayerGui");
    warn("MinimapRenderer is dev disabled from rendering.");

    task.spawn(() => {
      task.wait(5);
      fw.events.MinimapDataChannel.FireServer(MINIMAP_C2S_COMMANDS.RefreshRequest);
    });
  }

  private getBaseGui(): ScreenGui {
    const baseGui = new Instance("ScreenGui");
    baseGui.Name = "MinimapGui";

    const frame = new Instance("Frame");
    frame.AnchorPoint = new Vector2(0.5, 0);
    // TODO: Make this configurable.
    frame.Position = new UDim2(0.5, 0, 0, 0);
    frame.Size = new UDim2(0, this.scale(600), 0, this.scale(300));
    frame.BackgroundColor3 = BrickColor.Black().Color;
    frame.BackgroundTransparency = 0.5;
    frame.Parent = baseGui;

    return baseGui;
  }

  private scale(value: number) {
    return value * this.renderScale;
  }

  protected messageHandler<T extends keyof MinimapS2CCommands>(command: T, ..._args: MinimapS2CCommands[T]): void {
    switch (command) {
      case MINIMAP_S2C_COMMANDS.RefreshFulfill: {
        const args = _args as MinimapS2CCommands[typeof MINIMAP_S2C_COMMANDS.RefreshFulfill];
        print("Received RefreshFulfill data from server.");
        print(args[0]);
        print(args[1]);
        break;
      }

      default:
        warn(`Received unknown command from server: ${command}`);
        break;
    }
  }
}
