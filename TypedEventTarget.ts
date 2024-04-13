/**
 * Typed EventTarget
 *
 * Re-exports the `EventTarget` class with updated types to enable specifying
 * the events it emits.
 *
 * Be aware these types are not enforced at runtime so this is not type safe.
 *
 * @example
 * ```ts
 * const target = new TypedEventTarget<{ message: MessageEvent<string> }>();
 * const target = new Example();
 * target.addEventListener('message', (event) => {
 *   event.data satisfies string
 * })
 * target.dispatchEvent(new MessageEvent('message', { data: 'lorem ipsum' }));
 * ```
 *
 * @example
 * ```ts
 * class Example extends TypedEventTarget<{ message: MessageEvent<symbol> }> {}
 * const example = new Example();
 * example.addEventListener('message', (event) => {
 *   event.data satisfies symbol
 * })
 * example.dispatchEvent(new MessageEvent('message', { data: Symbol() }));
 * ```
 *
 * @module
 */

/**
 * EventTarget with updated types to enable specifying the events it emits.
 * @extends EventTarget
 */
export const TypedEventTarget: {
  new <T extends Record<string, Event>>(): TypedEventTarget<T>;
} = EventTarget as any;
export interface TypedEventTarget<Events extends Record<string, Event>>
  extends EventTarget {
  /** Appends an event listener for events whose type attribute value is type.
   * The callback argument sets the callback that will be invoked when the event
   * is dispatched.
   *
   * The options argument sets listener-specific options. For compatibility this
   * can be a boolean, in which case the method behaves exactly as if the value
   * was specified as options's capture.
   *
   * When set to true, options's capture prevents callback from being invoked
   * when the event's eventPhase attribute value is BUBBLING_PHASE. When false
   * (or not present), callback will not be invoked when event's eventPhase
   * attribute value is CAPTURING_PHASE. Either way, callback will be invoked if
   * event's eventPhase attribute value is AT_TARGET.
   *
   * When set to true, options's passive indicates that the callback will not
   * cancel the event by invoking preventDefault(). This is used to enable
   * performance optimizations described in § 2.8 Observing event listeners.
   *
   * When set to true, options's once indicates that the callback will only be
   * invoked once after which the event listener will be removed.
   *
   * The event listener is appended to target's event listener list and is not
   * appended if it has the same type, callback, and capture. */
  addEventListener<K extends keyof Events>(
    type: K,
    listener: EventListenerOrEventListenerObject<Events[K]> | null,
    options?: boolean | AddEventListenerOptions,
  ): void;
  /** Dispatches a synthetic event to event target and returns true if either
   * event's cancelable attribute value is false or its preventDefault() method
   * was not invoked, and false otherwise. */
  dispatchEvent<K extends keyof Events>(event: Events[K]): boolean;
  /** Removes the event listener in target's event listener list with the same
   * type, callback, and options. */
  removeEventListener<K extends keyof Events>(
    type: K,
    callback: EventListenerOrEventListenerObject<Events[K]> | null,
    options?: EventListenerOptions | boolean,
  ): void;
}

type EventListenerOrEventListenerObject<E extends Event> =
  | EventListener<E>
  | EventListenerObject<E>;

interface EventListener<E extends Event> {
  (evt: E): void | Promise<void>;
}

interface EventListenerObject<E extends Event> {
  handleEvent(evt: E): void | Promise<void>;
}
