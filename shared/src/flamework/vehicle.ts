import { Component, BaseComponent } from "@flamework/components";
import { OnStart } from "@flamework/core";

@Component({ tag: "vehicle-component-tag" })
export class VehicleComponent extends BaseComponent implements OnStart {
	constructor() {
		super();
	}

	onStart(): void {
		print(`Wow! I'm attached to ${this.instance.GetFullName()}`);
	}
}
