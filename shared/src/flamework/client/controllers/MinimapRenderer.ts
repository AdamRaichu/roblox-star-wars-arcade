import { Controller } from "@flamework/core";
import { MINIMAP_CONTROLLER_COMMANDS } from "../../../constants";

const fw = script.Parent?.Parent?.Parent as LocalFlameworkFolder;

const StarterGui = game.GetService("StarterGui");
const Players = game.GetService("Players");

@Controller()
export class MinimapRenderer {
  constructor() {
    print("MinimapRenderer initialized.");

    fw.events.MinimapDataChannel.OnClientEvent.Connect((...args) => {
      this.dataHandler(args);
    });

    const gui = this.getBaseGui();
    gui.Parent = Players.LocalPlayer.WaitForChild("PlayerGui");
  }

  private getBaseGui(): ScreenGui {
    const baseGui = new Instance("ScreenGui");
    baseGui.Name = "MinimapGui";
    return baseGui;
  }

  private dataHandler(..._args: unknown[]) {
    if (_args.size() === 0) {
      warn("Received empty data from server.");
      warn(_args);
      return;
    }

    const args = _args as defined[];
    const _command = args.shift();

    if (!(typeOf(_command) === "string")) {
      warn("Received invalid first argument from server.");
      warn(args);
      return;
    }

    const command: string = _command as string;

    switch (command) {
      case MINIMAP_CONTROLLER_COMMANDS.BaseTeamChange:
        // Update map
        break;

      default:
        warn(`Received unknown command from server: ${command}`);
        break;
    }
  }
}
