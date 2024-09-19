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
  const activeId = computed(() => rovingFocus() ? undefined : state().activeOption?.id());
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

  option.active = computed(() => {
    const index = option.index!();
    const activeIndex = listbox.state().activeIndex;
    const rovingFocus = listbox.rovingFocus();

    return activeIndex === undefined && rovingFocus
      ? index === 0
      : index === activeIndex;
  });

  option.selected = computed(() => {
    const index = option.index!();
    const rovingFocus = listbox.rovingFocus();
    const followFocus = listbox.followFocus();
    const selectedIndex = listbox.state().selectedIndex;
    
    return selectedIndex === undefined && rovingFocus && followFocus
      ? index === 0
      : index === selectedIndex;
  });

  option.tabindex = ListOption.tabindex(listbox.rovingFocus, option.active);
  return option as ListboxOption;
}

function createListboxState(rovingFocus: boolean): WritableSignal<ListboxState> {
  return signal({});
}
