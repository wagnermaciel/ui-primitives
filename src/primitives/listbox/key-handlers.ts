import { getNextOption, getPrevOption } from './composables/list';
import { Listbox, ListboxState } from './interfaces';

export function onKeyDown(event: KeyboardEvent, listbox: Listbox) {
  switch (event.key) {
    case 'ArrowDown':
      return onArrowDown(listbox);
    case 'ArrowUp':
      return onArrowUp(listbox);
    default:
      return listbox.state();
  }
}

function onArrowUp(listbox: Listbox): ListboxState {
  const state = listbox.state();
  const activeOption = getPrevOption(listbox);
  const selectedOption = listbox.followFocus() ? activeOption : state.selectedOption;

  return {
    activeOption,
    activeIndex: activeOption.index(),
    selectedOption,
    selectedIndex: selectedOption?.index(),
  }
}

function onArrowDown(listbox: Listbox): ListboxState {
  const state = listbox.state();
  const activeOption = getNextOption(listbox);
  const selectedOption = listbox.followFocus() ? activeOption : state.selectedOption;

  return {
    activeOption,
    activeIndex: activeOption.index(),
    selectedOption,
    selectedIndex: selectedOption?.index(),
  }
}
