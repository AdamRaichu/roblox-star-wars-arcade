import { BaseComponent, Component } from "@flamework/components";
import { MinimapTracker } from "../services";

// FIXME: Find correct tag
@Component({ tag: "map-corner-component" })
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export class MapCornerComponent extends BaseComponent<{}, PartWithAttachment> {
  constructor(private minimapTracker: MinimapTracker) {
    super();

    this.minimapTracker.registerCorner(this.instance);
  }
}
