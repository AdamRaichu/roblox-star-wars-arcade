import { Flamework } from "@flamework/core";
import * as logic from "./game_logic";

export * as teams from "./teams";
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

	export interface RideableModel extends ModelWithHealth {
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

	/**
	 * See `WithHealthComponent`
	 */
	interface ModelWithHealth extends Model {
		HealthConfig: HealthConfigData;
	}

	interface HealthConfigData extends Folder {
		Hitbox: Part;

		CurrentHealth: IntValue;
		// Intended to be static.
		MaxHealth: IntValue;
		HealthRegenAmount: IntValue;
		HealthRegenInterval: NumberValue;
	}

	interface ForBothTeams<T> {
		Republic: T;
		Separatist: T;
	}
}
