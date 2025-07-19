import { useSyncExternalStore } from "react";

type Listener = () => void;

class Store<T> {
  private state: T;
  private listeners: Set<Listener>;

  constructor(initialState: T) {
    this.state = initialState;
    this.listeners = new Set();
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getSnapshot() {
    return this.state;
  }

  setState(newState: T) {
    this.state = newState;
    this.listeners.forEach((listener) => listener());
  }
}

export function useStore<T>(initialState: T) {
  const storage = new Store(initialState);

  function store() {
    return useSyncExternalStore(
      storage.subscribe.bind(storage),
      storage.getSnapshot.bind(storage)
    );
  }

  return [store, storage.setState.bind(storage)] as const;
}
