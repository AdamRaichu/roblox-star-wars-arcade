export * as teams from "./teams";
import * as logic from "./game_logic";
export { logic };

declare global {
	export interface GameStatus {
		bases: logic.Base[][];
	}

	export interface GameSettings {
		gameType: GameType;
		prebuiltBuildings: [Vector2, logic.DestructibleBuilding][];
		availableBuildings: ForBothTeams<logic.DestructibleBuilding[][]>;
		initialFunds: ForBothTeams<number>;
	}

	enum GameType {
		CommandCenter,
	}

	export interface RideableModel extends Model {
		VehicleSeat: VehicleSeat;
		Base: Part;
		Engine: Part;
		CONFIG: VehicleConfigData;
		DismountLocation: Part;
	}

	interface VehicleConfigData extends Folder {
		ControllingTeam: StringValue;
		CanBeHijacked: BoolValue;
	}

	interface WithHitbox extends Instance {
		Hitbox: Part;
	}

	interface ForBothTeams<T> {
		Republic: T;
		Separatist: T;
	}
}
