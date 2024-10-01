import { BULLET_SPEED } from "../constants";
import { getPointFromDistance } from "../utils";

const CollectionService = game.GetService("CollectionService");
const TweenService = game.GetService("TweenService");

export function fireBullet(origin: BasePart, angle: Vector3, maxDistance: number, teamOwner: Team): Promise<void> {
  return new Promise((resolve, reject) => {
    const originPoint = origin.Position;

    const bullet = new Instance("Part");
    bullet.Position = originPoint;
    bullet.Size = new Vector3(2, 0.3, 0.3);
    bullet.Material = Enum.Material.Neon;
    bullet.Color = teamOwner.TeamColor.Color;
    bullet.CanCollide = false;
    const orientation = new Vector3(...origin.CFrame.ToEulerAnglesXYZ()).mul(180 / math.pi).add(new Vector3(0, 90, 0));
    bullet.Rotation = orientation;
    bullet.Anchored = true;

    bullet.Parent = game.Workspace;

    const hitDetector = bullet.Touched.Connect((part) => {
      if (part.Name === "Terrain") {
        hitDetector.Disconnect();
        return;
      }

      // TODO: damage target
    });

    const targetPoint = getPointFromDistance(originPoint, angle, maxDistance);
    const duration = maxDistance / BULLET_SPEED;
    const tweenOptions = new TweenInfo(duration, Enum.EasingStyle.Linear, Enum.EasingDirection.In, 1, false, 0);
    const tween = TweenService.Create(bullet, tweenOptions, { Position: targetPoint });
    tween.Play();
    task.wait(duration);
    bullet.Destroy();
    hitDetector.Disconnect();
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
