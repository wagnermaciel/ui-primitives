import { getNextOption, getPrevOption } from './composables/list';
import { getState } from './getters';
import { Listbox, ListboxState } from './interfaces';

export function onKeyDown(event: KeyboardEvent, listbox: Listbox) {
  const state = getState(listbox);

  switch (event.key) {
    case 'ArrowDown':
      return onArrowDown(listbox, state);
    case 'ArrowUp':
      return onArrowUp(listbox, state);
    default:
      return state;
  }
}

function onArrowUp(listbox: Listbox, state: ListboxState): ListboxState {
  const activeOption = getPrevOption(listbox, state);
  const selectedOption = listbox.followFocus() ? activeOption : state.selectedOption;

  return {
    activeOption,
    activeIndex: activeOption.index(),
    selectedOption,
    selectedIndex: selectedOption?.index(),
  }
}

function onArrowDown(listbox: Listbox, state: ListboxState): ListboxState {
  const activeOption = getNextOption(listbox, state);
  const selectedOption = listbox.followFocus() ? activeOption : state.selectedOption;

  return {
    activeOption,
    activeIndex: activeOption.index(),
    selectedOption,
    selectedIndex: selectedOption?.index(),
  }
}
