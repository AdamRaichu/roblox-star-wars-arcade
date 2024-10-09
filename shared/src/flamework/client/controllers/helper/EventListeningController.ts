export abstract class EventListeningController<S extends RemoteEventArgs> {
  constructor(private event: RemoteEvent) {
    event.OnClientEvent.Connect(<T extends keyof S>(command: T, ...args: S[T]) => {
      if (typeOf(command) !== "string") {
        return;
      }

      // trust server
      this.messageHandler(command, ...args);
    });
  }

  protected abstract messageHandler<T extends keyof S>(command: T, ...args: S[T]): void;
}
