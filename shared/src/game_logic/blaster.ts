import { BULLET_SPEED } from "../constants";
import { getPointFromDistance } from "../utils";

const CollectionService = game.GetService("CollectionService");
const TweenService = game.GetService("TweenService");

export function fireBullet(originPoint: Vector3, angle: Vector3, maxDistance: number, teamOwner: Team): Promise<void> {
  return new Promise((resolve, reject) => {
    const bullet = new Instance("Part");
    bullet.Position = originPoint;
    // // FIXME: Make `Game.goodGuys` public.
    // bullet.CollisionGroup =
    // 	(player.Team?.Name === Game.goodGuys.Name ? collisionGroups[0] : collisionGroups[1]) ??
    // 	Physics.GetRegisteredCollisionGroups()[0].name;
    bullet.Size = new Vector3(1, 1, 1);
    bullet.Material = Enum.Material.Neon;
    bullet.Color = teamOwner.TeamColor.Color;
    bullet.Anchored = false;

    bullet.Parent = game.Workspace;

    const hitDetector = bullet.Touched.Connect((part) => {
      if (part.Name === "Terrain") {
        return;
      }
      print("Touched part");
      print(part);

      // TODO: damage target
    });

    const targetPoint = getPointFromDistance(angle, maxDistance);
    print(targetPoint);
    const duration = maxDistance / BULLET_SPEED;
    const tweenOptions = new TweenInfo(duration, Enum.EasingStyle.Linear, Enum.EasingDirection.In, 1, false, 0);
    const tween = TweenService.Create(bullet, tweenOptions, { Position: targetPoint });
    tween.Play();
    task.wait(duration);
    bullet.Destroy();
    hitDetector.Disconnect();
    print("Bullet destroyed");
    resolve();
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
