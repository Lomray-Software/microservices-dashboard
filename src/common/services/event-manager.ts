/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
interface IEvents {
  [channel: string]: ((data: any) => void)[];
}

export interface IUnsubscribe {
  (): EventManager;
}

/**
 * Simple event manager pattern for pub/sub
 */
class EventManager {
  private static events: IEvents = {};

  /**
   * Subscribe handler on a channel
   */
  static subscribe = <TMessage = any>(
    channelName: string,
    handler: (data: TMessage) => void,
  ): IUnsubscribe => {
    if (!EventManager.events[channelName]) {
      EventManager.events[channelName] = [];
    }

    EventManager.events[channelName].push(handler);

    return (): EventManager => EventManager.unsubscribe(channelName, handler);
  };

  /**
   * Unsubscribe handler from a channel
   */
  static unsubscribe = (channelName: string, handler: (data: any) => void): EventManager => {
    const handlerIdx = EventManager.events?.[channelName]?.indexOf(handler) ?? null;

    // Remove handler
    if (handlerIdx !== null && handlerIdx !== -1) {
      EventManager.events[channelName].splice(handlerIdx, 1);
    }

    return EventManager;
  };

  /**
   * Publish data to channel
   */
  static publish = <TMessage = any>(channelName: string, data: TMessage): EventManager => {
    EventManager.events?.[channelName]?.forEach((handler) => handler(data));

    return EventManager;
  };
}

export default EventManager;
