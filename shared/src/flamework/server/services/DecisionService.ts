import { Service } from "@flamework/core";
import { BuildingTracker } from "./BuildingTracker";

@Service()
export class DecisionService {
  updateId: number = 0;
  // private _shouldCheckForChanges = new Instance("BindableEvent");
  // public shouldCheckForChanges = this._shouldCheckForChanges.Event;

  constructor(private readonly buildingTracker: BuildingTracker) {
    print("DecisionService initialized");

    task.spawn(() => {
      this.buildingTracker.getBases().forEach((columns) => {
        columns.forEach((base) => {
          base.onChange.Connect(() => {
            this.updateId++;
          });
        });
      });
    });
  }
}
