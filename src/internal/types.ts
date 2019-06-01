/** OBSERVER INTERFACES */
export interface Observer<T> {
  closed?: boolean;
  next?: (value: T) => void;
  error?: (err: any) => void;
  complete?: () => void;
}

/** SUBSCRIPTION INTERFACES */
export interface Unsubscribable {
  unsubscribe(): void;
}

export interface Subscribable<T> {
  subscribe(next?: (value: T | Highland.Nil)=> void, error?: (error: any) => void, complete?: () => void): Unsubscribable;
  asStream(): Highland.Stream<T>;
}

export type SubscribableOrPromise<T> = Subscribable<T> | Subscribable<never> | PromiseLike<T> | Highland.Thenable<T>;
export type ObservableInput<T> = SubscribableOrPromise<T> | ArrayLike<T> | Iterable<T>;

export interface Operatable<T, R> {
  stream$(): Highland.Stream<R>;
}

export interface Destroyable {
  destroy(): void;
}

export interface Pausable {
  resume(): void;
  pause(): void;
}