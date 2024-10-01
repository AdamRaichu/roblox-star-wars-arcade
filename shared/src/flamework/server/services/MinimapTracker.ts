import { Service } from "@flamework/core";
import { MinimapTrackedComponent } from "../components/MinimapTrackedComponent";
import { MINIMAP_ICON_IDS } from "../../../constants";

@Service()
export class MinimapTracker {
  private trackedComponents: MinimapTrackedComponent<MinimapTrackedModel>[] = [];
  private icons: MINIMAP_ICON_IDS[] = [];

  constructor() {
    print("MinimapTracker initialized");
  }

  public registerComponent(component: MinimapTrackedComponent<MinimapTrackedModel>, iconId: MINIMAP_ICON_IDS) {
    this.trackedComponents.push(component);
    this.icons.push(iconId);
  }
}
