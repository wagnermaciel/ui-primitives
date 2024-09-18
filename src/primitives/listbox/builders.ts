import { computed, Signal, signal, WritableSignal } from '@angular/core';
import { Listbox, ListboxOption, ListboxState } from './interfaces';
import * as ListOption from './composables/list-option';

export function createListbox(
  options: Signal<ListboxOption[]>,
  opts?: {
    wrap?: Signal<boolean>;
    multi?: Signal<boolean>;
    rovingFocus?: Signal<boolean>;
    followFocus?: Signal<boolean>;
  }
): Listbox {
  const wrap = opts?.wrap || signal(true);
  const multi = opts?.multi || signal(false);
  const rovingFocus = opts?.rovingFocus || signal(true);
  const followFocus = opts?.followFocus || signal(true);
  const state = createListboxState(rovingFocus());
  const activeId = computed(() => state().activeOption?.id());
  const tabindex = computed(() => rovingFocus() ? -1 : 0);
  return {
    wrap,
    multi,
    options,
    rovingFocus,
    followFocus,
    activeId,
    tabindex,
    state,
  };
}

let counter = 0;

export function createListboxOption(
  listbox: Listbox,
  opts?: { focus?: () => void; disabled?: Signal<boolean>; }
): ListboxOption {
  const focus = opts?.focus || (() => {});
  const disabled = opts?.disabled || signal(false);
  const option: Partial<ListboxOption> = { focus, disabled };
  option.id = signal(`${counter++}`);
  option.index = computed(() => listbox.options().indexOf(option as ListboxOption)!);
  option.active = computed(() => listbox.state().activeIndex === option.index!());
  option.selected = computed(() => listbox.state().selectedIndex === option.index!());
  option.tabindex = ListOption.tabindex(listbox.rovingFocus, option.active);
  return option as ListboxOption;
}

function createListboxState(rovingFocus: boolean): WritableSignal<ListboxState> {
  if (rovingFocus) {
    return signal({
      activeIndex: 0,
      selectedIndex: 0,
    });
  }

  return signal({});
}
