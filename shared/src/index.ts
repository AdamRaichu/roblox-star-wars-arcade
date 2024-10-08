// empty
import { BUILD_MENU_ICON_IDS, MINIMAP_ICON_IDS } from "./flamework/constants";

declare global {
  export interface GameSettings {
    gameType: GameType;
    prebuiltBuildings: [Vector2, DestructibleBuilding][];
    availableBuildings: ForBothTeams<DestructibleBuilding[][]>;
    initialFunds: ForBothTeams<number>;
  }

  enum GameType {
    CommandCenter,
  }

  export interface DestructibleBuilding extends MinimapTrackedModel {
    /**
     * An attachment used to determine where a building should be placed.
     */
    AnchorToBase: PartWithAttachment;
  }

  export interface BaseModel extends Model {
    Center: Model;
    Outline: UnionOperation;
    Shield: Part;
    BuildingsContainer: Folder;
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

  export interface RideableModel extends ModelWithHitbox {
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

  interface MinimapTrackedModel extends ModelWithHitbox {
    Hitbox: Part & {
      MinimapPositionBeacon: Attachment;
    };
  }

  /**
   * See `WithHealthComponent`
   */
  interface ModelWithHitbox extends Model {
    Hitbox: Part;
  }

  /**
   * @deprecated Being replaced by attributes.
   */
  interface HealthConfigData extends Folder {
    Hitbox: Part;

    CurrentHealth: IntValue;
    // Intended to be static.
    MaxHealth: IntValue;
    HealthRegenAmount: IntValue;
    HealthRegenInterval: NumberValue;
  }

  interface HealthAttributes {
    CurrentHealth: number;
    MaxHealth: number;
    HealthRegenAmount: number;
    HealthRegenInterval: number;
  }

  interface BuildMenuCategory {
    iconId: BUILD_MENU_ICON_IDS;
    options: BuildMenuOptionData[];
  }

  interface BuildMenuOptionData {
    iconId: BUILD_MENU_ICON_IDS;
    price: number;
    model: DestructibleBuilding;
  }

  interface ForBothTeams<T> {
    Republic: T;
    Separatists: T;
  }

  interface MinimapItem {
    iconId: MINIMAP_ICON_IDS;
    color: Color3;
    position: Vector2;
  }
}
