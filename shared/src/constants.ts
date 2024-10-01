/**
 * Speed of blaster bolts in studs per second. Used in tweens to calculate duration.
 *
 * ```ts
 * new TweenInfo(maxDistance / BULLET_SPEED, [...])
 * ```
 */
export const BULLET_SPEED = 32;
/**
 * The value to set the `Transparency` property of the Shield part when it is visible/enabled.
 */
export const SHIELD_VISIBLE_TRANSPARENCY = -8;

export enum MINIMAP_CONTROLLER_COMMANDS {
  BaseTeamChange = "base-team-change",
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
