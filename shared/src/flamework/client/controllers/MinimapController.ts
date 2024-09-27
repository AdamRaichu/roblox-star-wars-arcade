import { Controller } from "@flamework/core";
import { MINIMAP_CONTROLLER_COMMANDS as MINIMAP_CONTROLLER_COMMAND } from "../../../constants";

const fw = script.Parent?.Parent?.Parent as LocalFlameworkFolder;

@Controller()
export class MinimapController {
  constructor() {
    fw.events.MinimapDataChannel.OnClientEvent.Connect((...args) => {
      this.dataHandler(args);
    });
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
      case MINIMAP_CONTROLLER_COMMAND.BaseTeamChange:
        // Update map
        break;

      default:
        warn(`Received unknown command from server: ${command}`);
        break;
    }
  }
}
