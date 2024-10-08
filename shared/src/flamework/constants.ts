/**
 * Speed of blaster bolts in studs per second. Used in tweens to calculate duration.
 *
 * ```ts
 * new TweenInfo(maxDistance / BULLET_SPEED, [...])
 * ```
 *
 * @deprecated
 */
export const BULLET_SPEED = 32;
export const BASIC_BULLET_DAMAGE = 1;
/**
 * The value to set the `Transparency` property of the Shield part when it is visible/enabled.
 */
export const SHIELD_VISIBLE_TRANSPARENCY = -8;

export const HITBOX_TAG = "with-health-hitbox";

export enum MINIMAP_CONTROLLER_COMMANDS {
  BaseTeamChange = "base-team-change",
}

export enum MINIMAP_C2S_COMMANDS {
  Refresh = "refresh",
}

export enum MINIMAP_ICON_IDS {
  Triangle,
  Square,
  BaseCircle,
  RayBeam,
}

export enum BUILD_MENU_ICON_IDS {
  GroundCannon,
  AirSupport,
  Barracks,
  // etc.
}
