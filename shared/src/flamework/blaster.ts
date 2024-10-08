import { Components as _Components } from "@flamework/components";
import { Dependency } from "@flamework/core";
import { BASIC_BULLET_DAMAGE, HITBOX_TAG } from "./constants";
import { getPointFromDistance, raycastBetweenPoints } from "../old/utils";
import { BuildingComponent, WithHealthComponent } from "./server/components";

const CollectionService = game.GetService("CollectionService");
const TweenService = game.GetService("TweenService");

export async function fireBullet(
  origin: BasePart,
  angle: Vector3,
  maxDistance: number,
  teamOwner: Team,
): Promise<void> {
  const Components = Dependency<_Components>();

  return new Promise((resolve, reject) => {
    const originPoint = origin.Position;
    const targetPoint = getPointFromDistance(originPoint, angle, maxDistance);

    const params = new RaycastParams();

    raycastBetweenPoints(originPoint, targetPoint, params).then(async (result) => {
      if (!result) {
        resolve();
        return;
      }

      const hit = result.Instance;

      if (hit.HasTag(HITBOX_TAG)) {
        const healthy = WithHealthComponent.getSubComponent(hit.Parent! as ModelWithHitbox);
        healthy.damage(BASIC_BULLET_DAMAGE);
      }
      resolve();
    });
  });
}

/**
 * bullet firing
 *
 * # Required info:
 * start
 * end
 * angle?
 * damage
 * collision?
 * owner (team)
 * # Sequence:
 * Detect trigger pull
 * create bullet
 * detect collision
 * begin tween
 * ## if collision:
 * damage target
 * destroy bullet
 * endif
 * stop detect collision (memory leak)
 *
 */
