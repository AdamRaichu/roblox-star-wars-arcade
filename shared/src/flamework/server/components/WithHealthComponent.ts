import { BaseComponent, Component } from "@flamework/components";

@Component({ tag: "with-health" })
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export abstract class WithHealthComponent<A extends {}, I extends ModelWithHealth> extends BaseComponent<A, I> {
  protected alive: boolean = false;
  protected healthConfig?: HealthConfigData;
  private _onDeath: BindableEvent = new Instance("BindableEvent");
  /**
   * Recommend only using `.Once()`.
   */
  public onDeath: RBXScriptSignal = this._onDeath.Event;

  constructor() {
    super();

    this.healthConfig = this.instance.HealthConfig;

    // Health regen.
    new Promise<void>((resolve, reject) => {
      if (typeIs(this.healthConfig, "nil")) {
        reject(`config values was undefined for component ${this.instance.GetFullName()}`);
        return;
      }
      const maxHealth = this.healthConfig.MaxHealth.Value;
      while (this.alive) {
        task.wait(this.healthConfig.HealthRegenInterval.Value);
        const currentHealth = this.healthConfig.CurrentHealth.Value;
        let newHealth = currentHealth + this.healthConfig.HealthRegenAmount.Value;
        newHealth = math.min(newHealth, maxHealth);
        this.healthConfig.CurrentHealth.Value = newHealth;
      }
      resolve();
    });

    this.onDeath.Once(() => {
      this.deathAnimation();
    });
  }

  public damage(amount: number): void {
    if (typeIs(this.healthConfig, "nil")) {
      return;
    }

    const currentHealth = this.healthConfig.CurrentHealth.Value;
    const newHealth = math.max(currentHealth - amount, 0);
    this.healthConfig.CurrentHealth.Value = newHealth;
    if (newHealth <= 0) {
      this.alive = false;
      this._onDeath.Fire();
    }
  }

  /**
   * Handle any cleanup that should run when this dies.
   */
  protected abstract deathAnimation(): void;
}
