import { BaseComponent, Component } from "@flamework/components";

@Component({ tag: "with-health" })
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export abstract class WithHealthComponent<
  I extends ModelWithHitbox = ModelWithHitbox,
  A extends HealthAttributes = HealthAttributes,
> extends BaseComponent<A, I> {
  protected alive: boolean = false;
  private _onDeath: BindableEvent = new Instance("BindableEvent");
  /**
   * Recommend only using `.Once()`.
   */
  public onDeath: RBXScriptSignal = this._onDeath.Event;

  constructor() {
    super();

    // Health regen.
    new Promise<void>((resolve, reject) => {
      const maxHealth = this.attributes.MaxHealth;
      while (this.alive) {
        task.wait(this.attributes.HealthRegenInterval);
        const currentHealth = this.attributes.CurrentHealth;
        let newHealth = currentHealth + this.attributes.HealthRegenAmount;
        newHealth = math.min(newHealth, maxHealth);
        this.attributes.CurrentHealth = newHealth;
      }
      resolve();
    });

    this.onDeath.Once(() => {
      this.deathAnimation();
    });
  }

  public isLiving() {
    return this.alive;
  }

  public damage(amount: number): void {
    const currentHealth = this.attributes.CurrentHealth;
    const newHealth = math.max(currentHealth - amount, 0);
    this.attributes.CurrentHealth = newHealth;
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
