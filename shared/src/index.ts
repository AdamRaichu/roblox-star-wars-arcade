export * as teams from "./teams";
export * as logic from "./game_logic";

declare global {
	export interface RideableModel extends Model {
		VehicleSeat: VehicleSeat;
		Base: BasePart;
		Engine: BasePart;
		CONFIG: VehicleConfigData;
	}

	interface VehicleConfigData extends Folder {
		ControllingTeam: StringValue;
		CanBeHijacked: BoolValue;
	}
}
