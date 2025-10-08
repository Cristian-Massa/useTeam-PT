type Listener = (data?: string, error?: Error) => void;

class HttpNotificationEmitter {
  private listeners: Listener[] = [];

  subscribe(listener: Listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  emitNotifcation(data: string) {
    this.listeners.forEach((listener) => listener(data));
  }

  emitError(error: Error) {
    this.listeners.forEach((listener) => listener(undefined, error));
  }
}

export const httpNotificationEmitter = new HttpNotificationEmitter();
