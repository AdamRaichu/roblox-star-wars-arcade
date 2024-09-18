import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";

@Component({ tag: "with-health" })
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export class WithHealthComponent<A extends {}, I extends ModelWithHealth>
	extends BaseComponent<A, I>
	implements OnStart
{
	protected alive: boolean = false;
	protected config?: HealthConfigData;

	constructor() {
		super();
	}

	setAlive(alive: boolean) {
		this.alive = alive;
	}

	onStart(): void {
		this.config = this.instance.HealthConfig;

		// Health regen.
		new Promise<void>((resolve, reject) => {
			if (typeIs(this.config, "nil")) {
				reject(`config values was undefined for component ${this.instance.GetFullName()}`);
				return;
			}
			const maxHealth = this.config.MaxHealth.Value;
			while (this.alive) {
				task.wait(this.config.HealthRegenInterval.Value);
				const currentHealth = this.config.CurrentHealth.Value;
				let newHealth = currentHealth + this.config.HealthRegenAmount.Value;
				newHealth = math.min(newHealth, maxHealth);
				this.config.CurrentHealth.Value = newHealth;
			}
		});
	}
}
