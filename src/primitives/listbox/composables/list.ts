import { Signal, WritableSignal } from "@angular/core";

interface ListLike<T> {
  wrap: Signal<boolean>;
  options: Signal<T[]>;
  state: WritableSignal<{ activeIndex?: number }>;
}

export function getPrevOption<T>(list: ListLike<T>): T {
  const state = list.state();
  const options = list.options();

  if (state.activeIndex === undefined) {
    return options[0];
  }

  if (list.wrap()) {
    const index = state.activeIndex === 0
      ? options.length - 1
      : state.activeIndex - 1;

    return options[index];
  }

  const index = Math.max(0, state.activeIndex + 1);
  return options[index];
}

export function getNextOption<T>(list: ListLike<T>): T {
  const state = list.state();
  const options = list.options();

  if (state.activeIndex === undefined) {
    return options[0];
  }

  const index = list.wrap()
    ? (state.activeIndex + 1) % options.length
    : Math.min(options.length - 1, state.activeIndex + 1);

  return options[index];
}
