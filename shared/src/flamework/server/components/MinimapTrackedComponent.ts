import { MINIMAP_ICON_IDS } from "../../../constants";
import { MinimapTracker } from "../services/MinimapTracker";
import { WithHealthComponent } from "./WithHealthComponent";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export abstract class MinimapTrackedComponent<
  A extends HealthAttributes,
  I extends MinimapTrackedModel,
> extends WithHealthComponent<A, I> {
  constructor(
    iconId: MINIMAP_ICON_IDS,
    private readonly minimapTracker: MinimapTracker,
  ) {
    super();

    this.minimapTracker.registerComponent(this, iconId);
  }
}
