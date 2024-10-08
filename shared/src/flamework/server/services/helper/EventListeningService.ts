export abstract class EventListeningService {
  constructor(event: RemoteEvent) {
    event.OnServerEvent.Connect((player, ...args) => {
      this.messageHandler(player, args);
    });
  }

  protected abstract messageHandler(player: Player, ...args: unknown[]): void;
}
