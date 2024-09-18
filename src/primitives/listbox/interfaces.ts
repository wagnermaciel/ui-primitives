import { Signal, WritableSignal } from "@angular/core";

export interface Listbox {
  wrap: Signal<boolean>;
  state: WritableSignal<ListboxState>;
  options: Signal<ListboxOption[]>;
  multi: Signal<boolean>;
  followFocus: Signal<boolean>;
  rovingFocus: Signal<boolean>;
  activeId: Signal<string | undefined>;
  tabindex: Signal<-1 | 0>;
}

export interface ListboxOption {
  id: Signal<string>;
  index: Signal<number>;
  active: Signal<boolean>;
  selected: Signal<boolean>;
  disabled: Signal<boolean>;
  tabindex: Signal<-1 | 0>;
  focus: () => void;
}

export interface ListboxState {
  activeOption?: ListboxOption;
  activeIndex?: number;
  selectedOption?: ListboxOption;
  selectedIndex?: number;
}
