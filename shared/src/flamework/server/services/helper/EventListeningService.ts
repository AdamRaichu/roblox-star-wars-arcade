export abstract class EventListeningService<S extends S2C_ARGS> {
  // private event: RemoteEvent;

  constructor(private event: RemoteEvent) {
    event.OnServerEvent.Connect((player, ...args) => {
      if (!args) {
        return;
      }
      if (typeOf(args[0]) !== "string") {
        return;
      }

      this.messageHandler(player, args);
    });
  }

  protected sendMessageToClient<T extends keyof S>(player: Player, command: T, ...args: S[T]): void {
    this.event.FireClient(player, command, ...args);
  }

  protected abstract messageHandler(player: Player, ...args: defined[]): void;
}
