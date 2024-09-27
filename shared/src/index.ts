import * as logic from "./game_logic";

export * as components from "./flamework/server/components";
export * as utils from "./flamework/utils";
export * as teams from "./flamework/server/teams";
export * as client from "./flamework/client";
export { sendSystemMessageTo } from "./flamework/server/system_chat";
export { logic };

declare global {
  export interface GameStatus {
    bases: logic.Base[][];
  }

  export interface GameSettings {
    gameType: GameType;
    prebuiltBuildings: [Vector2, DestructibleBuilding][];
    availableBuildings: ForBothTeams<DestructibleBuilding[][]>;
    initialFunds: ForBothTeams<number>;
  }

  enum GameType {
    CommandCenter,
  }

  export interface DestructibleBuilding extends ModelWithHealth {
    /**
     * An attachment used to determine where a building should be placed.
     */
    AnchorToBase: PartWithAttachment;
  }

  export interface BaseModel extends Model {
    Center: Model;
    Outline: UnionOperation;
    Shield: Part;
    BuildingLocations: Folder & {
      North: PartWithAttachment;
      NorthEast: PartWithAttachment;
      East: PartWithAttachment;
      SouthEast: PartWithAttachment;
      South: PartWithAttachment;
      SouthWest: PartWithAttachment;
      West: PartWithAttachment;
      NorthWest: PartWithAttachment;
    };
  }

  interface PartWithAttachment extends Part {
    Attachment: Attachment;
  }

  export interface RideableModel extends ModelWithHealth {
    VehicleSeat: VehicleSeat;
    Base: Part;
    Engine: Part;
    VehicleConfig: VehicleConfigData;
    DismountLocation: Part;
  }

  interface RideableModel_AfterServerInit extends RideableModel {
    FireEvent: RemoteEvent;
    VehicleSeat: VehicleSeat & {
      MountDismountPrompt: ProximityPrompt;
    };
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

  interface BuildMenuCategory {
    // icon: Instance
    options: BuildMenuOptionData[];
  }

  interface BuildMenuOptionData {
    price: number;
    model: DestructibleBuilding;
  }

  interface ForBothTeams<T> {
    Republic: T;
    Separatists: T;
  }
}
