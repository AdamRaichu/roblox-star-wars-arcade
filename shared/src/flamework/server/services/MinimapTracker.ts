import { Service } from "@flamework/core";
import { MINIMAP_ICON_IDS } from "../../../constants";
import { WithHealthComponent } from "../components";

@Service()
export class MinimapTracker {
  private trackedComponents: WithHealthComponent<MinimapTrackedModel>[] = [];
  private icons: MINIMAP_ICON_IDS[] = [];
  private colors: Color3[] = [];

  constructor() {
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
}
