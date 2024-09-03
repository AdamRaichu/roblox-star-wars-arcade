export * as teams from "./teams";
import * as logic from "./game_logic";
export { logic };

declare global {
	interface GameStatus {
		Bases: Base[][];
	}

	interface Base {
		Owner: Team;
		N: logic.DestructibleBuilding;
		NE: logic.DestructibleBuilding;
		E: logic.DestructibleBuilding;
		SE: logic.DestructibleBuilding;
		S: logic.DestructibleBuilding;
		SW: logic.DestructibleBuilding;
		W: logic.DestructibleBuilding;
		NW: logic.DestructibleBuilding;
	}

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
